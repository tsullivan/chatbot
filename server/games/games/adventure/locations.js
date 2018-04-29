const { Location } = require('./class_location');
const {
  LocationKeywordResponse
} = require('./class_location_keyword_response');

const NORTH = 'north';
const EAST = 'east';
const SOUTH = 'south';
const WEST = 'west';

function getLocations(game) {
  const START = new class StartLocation extends Location {
    constructor() {
      super({
        game,
        name: 'Main Entrance',
        description: `It is the night time. You are outside, surrounded by dark trees, and you're very tired. There is a castle and a cave. Which way looks to be best to find a nice comfy bed to rest? I didn't mean for that to rhyme.`,
        instructions:
          'Type CAVE to go down into the cave or CASTLE to head up to the castle.'
      });

      this.addKeyword('CAVE', () => this.followExit(EAST));
      this.addKeyword('CASTLE', () => this.followExit(NORTH));
    }
  }();

  const CAVE = new class CaveLocation extends Location {
    constructor() {
      super({
        game,
        name: 'Main Cave',
        description: `It's unnaturally cheery in this smelly old cave. Probably because of the tiny village of tiny dancing skeleton hands. So cute! So tiny! So skeleton handsy!`,
        instructions:
          'Type DANCE to dance with the tiny skeleton hands, LOOK to look closer at the tiny village, EXIT to get out of the cheery smelly old cave.'
      });

      this.addKeyword('DANCE', () => new LocationKeywordResponse({
        text: `The dance is beautiful, with flowing, synchronized forms. However, as hands have no ears, and skeleton hands are the forms that are dancing, there is no music. You can infer a beat, but you can not move your feet to synchronize in kind - as the hands also do not have feet and are instead dancing upon the tips of their skeleton fingers. You have no hope to try to participate. Just take a minute to enjoy the show. Or keep finding a way to rest your weary self. It's still late at night and you're still tired. GAIN A POINT`,
        reduceScore: -1 // add a point for the heck of it
      }));

      this.addKeyword('LOOK', () => {
        const text = [];
        text.push(
          'The tiny village has a tiny hotel with tiny beds made for resting upon by tiny skeleton hands. It warms you heart to see, but it makes you no less tired and your warmed heart is at the same time shamed with the truthful knowledge that you can find no rest in this enjoyable place.'
        );
        if (this.hasItem('window_handle')) {
          text.push(
            'The hotel building has a strange type of flagpole on the roof that looks like it can be held in a normal human hand like your own.'
          );
        }
        // TODO: activate TAKE_HANDLE keyword action
        return new LocationKeywordResponse({ text: text.join('\n') });
      });

      this.addKeyword('TAKE_HANDLE', () => {
        // TODO add the handle to the game inventory
        // TODO: deactivate TAKE_HANDLE keyword action
        if (this.hasItem('window_handle')) {
          return new LocationKeywordResponse({
            text: 'Can you handle the handle? I guess you can. The handle has been taken by you.'
          });
        } else {
          return new LocationKeywordResponse({
            text: 'There is no handle here to handle. LOSE A POINT',
            reduceScore: 1
          });
        }
      });

      this.addKeyword('EXIT', () => this.followExit(WEST));
    }
  }();

  const CASTLE = new class CastleLocation extends Location {
    constructor() {
      super({
        game,
        name: 'Main Castle',
        description: `In the great hall of the castle, there are beautiful open-air windows with warm, nice-smelling air drifting through. Sunlight is catching a few specks of dust floating in the air. Not that much though, because it's pretty clean in here. There's also a nice looking comfy bed in the middle of the great hall. Hey wait - isn't it night time? Where is that light coming from?`,
        instructions:
          'Type SLEEP to sleep on the comfy bed, LOOK to look closer at the open-air windows, EXIT to leave the beautful great hall and the castle.'
      });

      this.addKeyword('SLEEP', () => {
        if (this.windowsOpen) {
          return new LocationKeywordResponse({
            text: `There is too much light coming in through the open-air windows. You'll never be able to enjoy even a minute's rest in this spectacular great hall! Oh yeah, and there are no other beds in this castle and all the rooms will kill you if you try to go in them because there are poison arrow traps everywhere. LOSE A POINT`,
            reduceScore: 1
          });
        } else {
          // YOU WIN
          return new LocationKeywordResponse({
            text: `With the windows closed and blocking out the the unusually bright outside night air, you rest your weary body on the comfy bed in the exquisitely decorated great hall, close your eyes and have a pleasant sleep. You dream pleasant dreams as your subconscious has been steeped from conscious knowledge that all the oddities you've encountered have been safely dealt with and you are out of harm's reach. Let's not think about what happens when you wake up. You deserve this rest so enjoy it completely. YOU WIN`,
            isDone: true
          });
        }
      });

      this.addKeyword('LOOK', () => {
        let text;
        if (this.windowsOpen) {
          text = `They're nice windows and all, but it's so bright in here! What kind of weird forces are around that would make the sun so bright at this time of night!?`;
        } else {
          text = `It's nice and quiet here. The windows are closed and no longer letting in that abonimanimal light.`;
        }
        return new LocationKeywordResponse({ text });
      });

      this.addKeyword('USE_WINDOW_CLOSER', () => {
        // TODO check if window closer is in the game inventory set
        this.windowsOpen = false;
        return new LocationKeywordResponse({
          text: `With a loud but suprisingly unrusty sounding "SSSSSSHNK" noise, metal roller doors slide down to cover the open-air windows. The windows are now closed-air windows. The room has much more cozy and relaxed lighting!`
        });
      });

      this.addKeyword('EXIT', () => this.followExit(SOUTH));
    }
  }();

  START.addExit({
    location: CAVE,
    exit: EAST,
    inverseExit: WEST
  });
  START.addExit({
    location: CASTLE,
    exit: NORTH,
    inverseExit: SOUTH
  });

  return {
    START,
    CAVE,
    CASTLE
  };
}

module.exports = { getLocations };
