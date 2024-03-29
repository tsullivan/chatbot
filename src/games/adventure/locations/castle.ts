import { s } from '../../../lib';
import { Adventure, KeywordResponse, Location } from '../../lib';
import { SOUTH, WINDOW_HANDLE } from '../constants';

export class CastleLocation extends Location {
  private windowsOpen: boolean;
  private socketsSeen: boolean;

  public constructor(game: Adventure) {
    super({ game, name: 'Great Hall of the Castle' });
    this.windowsOpen = true;
    this.socketsSeen = false;
  }

  public getDescription(_game: Adventure) {
    if (this.windowsOpen) {
      return s`In the great hall of the castle, there are beautiful
        open-air windows with warm, nice-smelling air drifting through.
        Sunlight is catching a few specks of dust floating in the air. Not
        that much though, because it's pretty clean in here. There's also a
        nice looking comfy bed in the middle of the great hall. Hey wait -
        isn't it night time? Where is that light coming from?`;
    }
    else {
      return s`In the great hall of the castle, there were beautiful
        open-air windows with warm, nice-smelling air that drifted through.
        Sunlight would catch a few specks of dust floating in the air. Not
        that much though, because it's pretty clean in here. But the area is
        pretty dark, so you wouldn't even be able to tell. There's also a nice
        looking comfy bed in the middle of the great hall.`;
    }
  }

  public setLocationKeywords(game: Adventure) {
    this.addKeyword('SLEEP', 'Sleep on the comfy bed', () => {
      if (this.windowsOpen) {
        const p = [
          s`There is too much light coming in through the open-air
            windows. You'll never be able to enjoy even a minute's rest in this
            spectacular great hall! Oh yeah, and there are no other beds in
            this castle and all the rooms will kill you if you try to go in
            them because there are poison arrow traps everywhere.`,
          'LOSE A POINT',
        ];
        return new KeywordResponse({
          changeScore: -1,
          text: p.join('\n\n'),
        });
      } else {
        // YOU WIN
        const p = [
          s`With the windows closed and blocking out the the
            unusually bright outside night air, you rest your weary body on the
            comfy bed in the exquisitely decorated great hall, close your eyes
            and have a pleasant sleep. You dream pleasant dreams as your
            subconscious has been steeped from conscious knowledge that all the
            oddities you've encountered have been safely dealt with and you are
            out of harm's reach. Let's not think about what happens when you
            wake up. You deserve this rest so enjoy it completely.`,
          'YOU WIN!!!',
        ];
        return new KeywordResponse({
          isDone: true,
          text: p.join('\n\n'),
        });
      }
    });

    this.addKeyword('LOOK', 'Look closer at the open-air windows', () => {
      let text;
      if (this.windowsOpen) {
        text = s`They're nice windows and all, but it's so bright in
          here! What kind of weird forces are around that would make the sun
          so bright at this time of night!?`;

        if (game.inInventory(WINDOW_HANDLE)) {
          text += s`Oh, also you notice that each window has a little socket in
            one corner, and that looks like the handle you're carrying in your pocket
            would fit in it! What do you say, want to give it a whirl???`;
          this.socketsSeen = true;
        }
      } else {
        text = s`It's nice and quiet here. The windows are closed and no
          longer letting in that abonimanimal light.`;
      }
      return new KeywordResponse({ text });
    });

    if (game.inInventory(WINDOW_HANDLE) && this.socketsSeen) {
      this.addKeyword(
        'USE_WINDOW_HANDLE',
        s`See if the handle in your pocket does anything against the sockets
          on the open windows in here`,
        () => {
          this.windowsOpen = false;
          game.deleteFromInventory(WINDOW_HANDLE);
          this.removeKeyword('USE_WINDOW_HANDLE');
          const p = [
            s`With a loud but suprisingly unrusty sounding "SSSSSSHNK" noise,
              metal roller doors slide down to cover the open-air windows. The
              windows are now closed-air windows. The room has much more cozy and
              relaxed lighting!`,
            s`Woah, the crank handle somehow became a permanent part of the
              castle window. Yeah, actually there was just one window and now the
              crank handle can never be retrieved from it. Want it back? Too bad.`,
          ];
          return new KeywordResponse({
            text: p.join('\n\n'),
          });
        }
      );
    }

    this.addKeyword('EXIT', 'Leave the beautful great hall and the castle.', () =>
      this.followExit(SOUTH)
    );
  }
}
