// @ts-ignore untyped module
import * as snl from 'strip-newlines';
import { Adventure, KeywordResponse } from '../../lib';
import { ELECTRONICS, MAGNET, PLAYGROUND, SOAP } from './constants';
import { getItems, setItemsToLocations } from './items';
import { Session } from '../../../bot';
import { getLocationsMap } from './locations';


/*
 * When you start the game, it will say
 *  'Iron Man and Spidey Save the City'
 *
 *
  



 *
 * Type in THWIP to shoot a web when you are spidey
 * Type in LASER_BLAST when you are Iron Man
 * Thow are the 2 actions they each can do
 * Sometimes when you look tired, you will be in the Marvel place
 *  - That's like the headquarters
 * When you type TURANGO you quit the game
 * When you die then BEEPBEEPBEEP will say GAME OVER
 * You win by doing combo: Spidy shoots a web, then Iron Man shoots out 4 Iron Blasts
 *  - Those hit a giant space orb 
 * When Galactus attacks, Spiderman jumps on Galactus and then bonks his eye, then Iron Man shoots a laser
 * You die by losing too many lifes
 * You can lose lifes from 
 *  - Goons
 *  - Grenades
 *  - Falling rocks
 *  - Laser beams (Spider Man only)
 *  - Iron Man accidentally shoots an Iron Blast at a mirror, and then Spider Man loses all his lifes
 * When Galactus comes to Earth, all the goons come out 
 *  - And he also starts eating the earth
 *  - The goons help Galactus to not get eaten 
 *
 *  Galactus gives the goons lasers and guns
 *
 *  When Galactus walk around, it causes falling rocks to hit everyone
 *
 *  Marvel Tower is where you can
 *   - Sleep - Save the game
 *   - Talk to Black Widow and Hawkeye who are in another dimension
 *     - Dimension of Gotham City
 *     - Batman will  be there (this is all for a different Gotham City game to make later)
 *
 *
 *
 *
 *
 *
Spider Man gets a call from Iron Man:
 “Spider Man! Galactus is coming to Earth! Get into your car! MOVE MOVE MOVE!”

Spider Man:
“Oh no! That’s really bad, Iron Man! My car is broken! What should I do?”

Iron Man:
“Just get onto your motorcycle!”

Spider Man:
“Oh yeah, that isn’t broken. But it’s at Aunt May’s!”

Iron Man:
“I’ll give you a boost, Spidey. Where are you?”

Spider Man:
“I’m on top of a building, which is under ground!”

Iron Man:
“I see you on my computer. But you might be heavy, right?”

Spider Man:
“Um yeah, I’m my normal weight.”

Iron Man: “Here we go! CRASH!”

Spider Man - jumps high into the air and is caught by Iron Man flying around in the underground cave. Spiderman does a thwip in the air, and it sticks to Iron Man’s leg. Iron Man flies in a big circle as Spiderman rides behin d and does flips. Theyt make it back to the hole and are back in the city flying above the building towards Galactus. IRON MAN: yikes! Spider man jumps into a portal BATMAN: hey!!!!!!! Who are you? SPIDER MAN: batman? Yeah!! 


Galactus is still coming closer to Earth. The two heroes can see a shiny thing far away in the sky, and it is purplish. They know it is Galactus and they can hear people screaming in the street and cars crashing into each other

As Iron Man and Spider Man are flying over the city, they see lots of goons in jets and they are getting in the way of the heroes.

"Hey what are you doing?" Says a voice below. Iron man and Spider man Stop and see Miles Morales. He swings up into the sky and shocks a jet. The jet gets fried and crumbles and falls on a roof of a car a person comes out and yells hey!!!!!!!!!!!!!!!! Batman is on his  bat jet and carries spider car omg!!!!!!!!!!!!!!!!!!!!!!!!!!!!Spider man says No time galactictus is here to kill!  us iron man yells  oh no! Batman yells 

As Galactus' giant armored alien body starts to descend on o the city, the heroes beat up the rest of the goons. Batman stands by waiting for the rumble to end, since he doesn't have super powers. Spiderman jumps into his car and starts it up. All the heroes quickly turn to take on Galactus, but then lasers shoot out of his feet and start to zap everything in sight. The heroes dodge and shield themselves to make their way closer to the center of the destruction. Batman shields the group with bat smoke.

Spiderman zooms his car fast towards Galactus's giant foot and jumps out of his car just in time for it to turn into a robot and start punching. Galactus stands on the ruined ground, his eyes gazing out to a faraway distance to size up his blast radius. But as the spider bot begins the attack, Galactus slowly looks down, and obliterates the Spider car bot with laser vision. Spiderman's car is destroyed!

"Now you're going to have to buy me another one, batman!" Says Spiderman. 

no me And why are you saying games in Spiderman names Iron Man sensei says okay man I am not going to let you use your own beeswax okay mean there aren't just my year-round blah blah is Andy can you get close yourself because piggy is going to he will around to me a new stock saying Rob clauses man can you just email Rob glasses from classes and just stabbed yourself because I am not going to send you anymore email the stairs going to have to buy yourself anything you can turn yourself into a comic say he just turn yourself in 10 me you yourself just yourself man because I am not going to see you ever again on black smell you only get a kick you in the face you just kick yourself for a second because I am not going teach you ever again I am only just man you were just going to hang yourself never she'll yourself and give yourself a butt shake from your him butt ha ha Ha ha-ha ha ha Spiderman yells Michelle said Capt. America I mean okay I got the elevators so just bad writing yourself you're mean just Use him pretty nothing because I have a lot lost agent Rob clauses yourself and haircut leading into that haircut is meaning to cut off your head driving your self since me is it Capt. America? Blah blah blah blah whole Geils lawn Larios To get       
 */

export default class BubbleGunGame extends Adventure {
  public constructor(session: Session) {
    super(session);
    this.setName('bubble_gun');
    this.postInit = () => {
      const locationsMap = getLocationsMap(this);
      this.setLocationsMap(locationsMap);
      const locations = {
        playgroundLocation: locationsMap.get(PLAYGROUND),
        bridgeLocation: locationsMap.get(PLAYGROUND),
        electronicsLocation: locationsMap.get(ELECTRONICS),
        soapLocation: locationsMap.get(SOAP),
        magnetLocation: locationsMap.get(MAGNET),
      };

      this.setLocation(locations.playgroundLocation);

      const items = getItems(this);
      setItemsToLocations(items, locations, this);
    };
  }

  public getWelcome() {
    return super.getWelcome(`# Welcome to Bubble Gun World`);
  }

  public lose(response: string) {
    const p = [
      response,
      'YOU LOST. You lost too many points!',
      snl`See ya, ${this.getPlayerName()}! Better luck next time! Turns:
        ${this.turns} Score: ${this.score}`,
    ];
    return new KeywordResponse({
      isDone: true,
      text: p.join('\n\n'),
    });
  }

  public win(response: string) {
    const p = [
      response,
      `Looks like you're a winner! Turns: ${this.turns} Score: ${this.score}`,
    ];
    return new KeywordResponse({
      isDone: true,
      text: p.join('\n\n'),
    });
  }
}

