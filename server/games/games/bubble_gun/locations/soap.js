const snl = require('strip-newlines');
const { Location, KeywordResponse } = require('../../../lib');
const { SOUTH } = require('../constants');

class SoapLocation extends Location {
  constructor(game) {
    super({ game, name: 'The Soap Store' });
    this._isSoapy = false;
    this._soapExperiences = 0;
  }

  getDescription() {
    const parts = [];
    parts[parts.length] = snl`Oh my goodness, this store has so much soap! It
      is by far the soapiest store you have ever been in!`;
    parts[parts.length] = snl`There is an extremely strong fragrance of clean
      in this place.`;

    return parts.join('\n\n');
  }

  updateState(/*game*/) {
    this.addKeyword('PLAYGROUND', 'Go back to the playground', () => {
      return this.followExit(SOUTH);
    });
    if (this._soapExperiences % 2 === 0) {
      this.addKeyword(
        [
          this._soapExperiences === 0
            ? 'ACCIDENTALLY_SPILL_SOME_SOAP'
            : 'ACCIDENTALLY_SPILL_SOME_MORE_SOAP',
          'SPILL',
        ],
        snl`You can accidentally spill some soap. No one will blame you because
          it will be an accident.`,
        () => {
          this._soapExperiences++;
          return new KeywordResponse({
            text: snl`OOPSIE. You accidentally spilled some soap on the floor!
              Be careful now, the floor might be slippery.`,
          });
        }
      );
    } else {
      this.addKeyword(
        ['DONT_BE_CAREFUL', 'SLIP'],
        snl`You can accidentally not be careful. No one will blame you because
          it will be another accident.`,
        () => {
          const parts = [
            snl`OOPSIE. You accidentally weren't careful and slipped on the
              soap that you spilled on the floor!`,
            this._soapExperiences % 4 === 1
              ? snl`BAM! There goes your bottom!`
              : snl`BONK! There goes your head!`,
          ];
          this._soapExperiences++;
          return new KeywordResponse({
            text: parts.join('\n\n'),
          });
        }
      );
    }
  }
}

module.exports = { SoapLocation };
