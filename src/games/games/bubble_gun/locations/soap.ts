import { snl } from '../../../../lib';
import { Adventure, KeywordResponse, Location, parajoin } from '../../../lib';
import { SOUTH } from '../constants';

export class SoapLocation extends Location {
  private soapExperiences = 0;

  public constructor(game: Adventure) {
    super({ game, name: 'The Soap Store' });
  }

  public getDescription(game: Adventure) {
    const lns = [
      snl`Oh my goodness, this store has so much soap! It is by far the
      soapiest place you have ever been in!`,
      snl`Another thing you notice right away is that there is an extremely
      strong fragrance of clean in this place.`,
    ];
    return parajoin(lns);
  }

  public setLocationKeywords(game: Adventure) {
    this.addKeyword('PLAYGROUND', 'Go back to the playground', () => {
      return this.followExit(SOUTH);
    });
    if (this.soapExperiences % 2 === 0) {
      this.addKeyword(
        [
          this.soapExperiences === 0
            ? 'ACCIDENTALLY_SPILL_SOME_SOAP'
            : 'ACCIDENTALLY_SPILL_SOME_MORE_SOAP',
          'SPILL',
        ],
        snl`You can accidentally spill some soap. No one will blame you because
          it will be an accident.`,
        () => {
          this.soapExperiences++;
          return new KeywordResponse({
            text: snl`OOPSIE. You accidentally spilled some soap on the floor!
              Be careful now, the floor might be slippery.`,
          });
        },
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
            this.soapExperiences % 4 === 1
              ? snl`BAM! There goes your bottom!`
              : snl`BONK! There goes your head!`,
          ];
          this.soapExperiences++;
          return new KeywordResponse({
            text: parts.join('\n\n'),
          });
        },
      );
    }
  }
}
