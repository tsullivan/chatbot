import { Session } from '../../bot';
import { ChatGame } from '../lib';
import { GameState, StoryLiner, StoryResponse } from '../lib/storyline';

const getStoryResponseFromTurn = (state: GameState): StoryResponse => {
  const story: (() => { text: string })[][] = [
    [
      () => ({
        text: `"Are you still tired, Spidey? I think you got enough rest, don't you?"\n\n
Iron Man looked down on the couch at Peter Parker, AKA SPIDERMAN. Peter yawned
and got up quickly. "I can handle anything today, Mr. Stark! These couches at
Marvel headquarters are the best thing for rest. We spent all day fighting that
space orb, so I really needed it."\n\n
"I'm glad you got your rest. Now there is something else we have to do. That
space orb was actually a beacon sent by GALACTUS! He is on is way to Earth
right now!"\n\n
The heroes got to thinking about how to save the world this time, and decided
on a teamwork strategy. Spider-Man would stay on Earth and use the Spideycycle
to help keep innocent citizens safe. Iron Man would fly to space and destroy
Galactus with his lasers.\n\n
As soon as these ideas occurred, a window near them smashed and a robot jumped
into the room! It posed the heroes with a math problem.`,
        challenge: 'sums',
      }),
      () => ({
        text: `OH MY GOSH" screamed Spider-Man, right the last of the robot
circuits had been smashed and put into the recycling bin.  "That robot was
definitely sent by Galactus - no doubt," said Iron Man. "Galactus' weapons are
nearly too much for us!"\n\n
"Well now, let's get to work on stopping that unwanted ancient space being from EVER returning!" said
Spider-Man. "One thing though: where is the Spidey cycle? Is it still in the
shop from after our last battle?"\n\n
"Yes" said Iron Man. "Aunt May is working on upgrading the engine also. I think
she said she would be done today though! I'll ask her to send it to us while
we're in battle as soon as it's ready!\n\n "Ok," said Spider-Man.
"I just need to send her the numeric codes so she knows," said Iron Man.`,
        challenge: 'sums',
      }),
      () => ({
        text: `"That's fine, Mr. Stark. Can you give me a boost to the center
of the city?" asked Spider-Man.\n\n
"Sure thing, kid." Iron Man tried to grab Spidey with his powerful armored
arms, but right before he could, Spider-Man thwipped Iron Man on the leg and
attached himself to his hero/mentor. Iron Man saw what was happening and tried
to carry Spider-Man by his web. Unfortunately, Spider-Man was a little heavy
and Iron Man lost control!\n\n
CRASH!!!!\n\n
"Mr. Stark, we should have used the door! Why did you crash through the
ceiling?" asked Spider-Man.\n\n
"Oops," said Iron Man. "Can you pretend that didn't just happen? Anyway, I can
pay the bill to get that fixed. I costs this much:"`,
        challenge: 'sums',
      }),
      () => ({
        text: `Together, the heroes flew out of the headquarters, with
Spider-Man attached and swinging from Iron Man's flying armor. They looked around
at the mayhem throughout the city. "Hey look!" said Spider-Man.  "Some goons are
attacking the city! They're everywhere! What do you think they want?"\n\n
One of the goons shouted, "We are working for Galactus! We are going to stop
  anyone from saving the world!\n\n
"NEVVVVVVVERRRRRR!" yelled Iron Man as the face mask on his metal helmet snapped
shut. He started talking in a robot voice now. "How do we stop them?"\n\n
"Mr. Stark, look! They are holding math problems. Let's try to solve them.
Maybe that defeats them?"\n\n
"That's right, heroes! Galactus gave us one weakness: math," said a goon as he
took a pause from smashing a building. "If you can solve the math problems, we
will be done here. Here is mine!" The goon launches a grenade with this math problem:`,
        challenge: 'sums',
      }),
      () => ({
        text: `"AAAAAA! You defeated me with the power of math!" said the goon,
and he ran away. He kept running until he got to the wilderness, where
he found a cave, explored it, decided to make it home, and then stayed
there for the rest of his life. He even raised a family there. The heroes
didn't get to see that happen, they just heard about it later.\n\n
"So! You think you can battle?" said a really tough goon, who watched
all this happen to his friend. "You think you know math? Here you go,
try this one!"`,
        challenge: 'sums',
      }),
      () => ({
        text: `Another goon jumps in to the battle! "Try this!" The goon threw a grenade!`,
        challenge: 'sums',
      }),
    ],
    [
      () => ({
        text: `"Wow, these sure are a lot of math goons, Mr. Stark!" Spider-Man
shouted over to Iron Man after finishing the defeat of the last goon.
"Have you seen any sign of my motorcycle yet though?"\n\n
"Not yet, Spidey. But I'm sure it will be here soon. Just keep battling!"\n\n
"What are my super-powers for this fight?" asked Spider-Man.\n\n
"This is just a math battle! Keep answering the problems!" yelled Iron Man. "I
got this next one!".`,
        challenge: 'sums',
      }),
      () => ({
        text: `"I would really feel more comfortable if I had my motorcycle,
wouldn't you?" said Spider-Man to Iron Man.\n\n
"No, because I don't drive a motorcycle. Stop worrying about it, Spidey!" said Iron Man.\n\n
"Ok. Woah there's another goon with a math problem!" said Spider-Man.`,
        challenge: 'sums',
      }),
      () => ({
        text: `Suddenly, the heroes noticed that the sky was starting to get
dark, but they couldn't see why.`,
        challenge: 'sums',
      }),
      () => ({
        text: `Another goon jumps in to the battle! "Try this!" The goon threw a grenade!`,
        challenge: 'sums',
      }),
    ],
    [
      () => ({
        text: `Suddenly, the sky began to grow dark, as if the sun was going
behind a dark cloud. Spider-Man and Iron Man looked at each other, to see if
they noticed it. Then they looked up together. The sun wasn't going down:
there was an enormous foot coming into the sky and blocking out the sun! The
foot was wearing a shiny purplish boot. It was getting bigger!\n\n
"Galactus is coming!" yelled a goon, who jumped into the battle.`,
        challenge: 'sums',
      }),
      () => ({
        text: `The foot in the sky was trying to stomp on the planet Earth, but it was too far.\n\n
"Galactus is coming!" yelled a goon.`,
        challenge: 'sums',
      }),
      () => ({
        text: `The foot in the sky grew into a leg. People all over Earth were
screaming, and cars were crashing everywhere.\n\n
"Galactus is coming!" yelled a goon.`,
        challenge: 'sums',
      }),
      () => ({
        text: `The leg grew into two legs. A goon jumped out of a jet right
before it crashed into a building.\n\n
"Galactus is coming!" yelled a goon.`,
        challenge: 'sums',
      }),
      () => ({
        text: `The two feet and legs grew a torso. The crashed jet destroyed
the roof of the building, and large chunks fell down and hit someone's car.
"Hey!!!" yelled the owner of the car. "What did you do to my car?"\n\n
"Galactus is coming!" yelled a goon.`,
        challenge: 'sums',
      }),
      () => ({
        text: `The two feet and legs and a torso grew a right arm.\n\n
"Galactus is coming!" yelled a goon.`,
        challenge: 'sums',
      }),
      () => ({
        text: `The two feet and legs and a torso and right arm grew a left arm.\n\n
"Galactus is coming!" yelled Spider-Man.`,
        challenge: 'sums',
      }),
      () => ({
        text: `The two feet and legs and a torso and right and left arm grew
hands. The hands were trying to grab the planet Earth, but he was too far.\n\n
"Galactus is coming!" yelled Iron Man.`,
        challenge: 'sums',
      }),
      () => ({
        text: `The two feet and legs and a torso and right and left and hands
grew the head of Galactus. His mouth was trying to chomp the planet Earth, but
he was too far.\n\n
"Galactus is coming!" yelled everyone on Earth.`,
        challenge: 'sums',
      }),
    ],
  ];

  return StoryLiner.feedMe(story, state);
};

export default class IronManAndSpideyGame extends ChatGame {
  private t: StoryLiner;

  public constructor(session: Session) {
    super(session);
    this.setName('ironman_and_spidey');
  }
  public init() {
    this.t = new StoryLiner(getStoryResponseFromTurn);
  }

  public async testInput(input: string) {
    return await this.t.testInput(input);
  }

  public getWelcome() {
    return `Get Ready!`;
  }
}
