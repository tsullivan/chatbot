const { sample } = require('lodash');

const getPart = from => sample(from.split('.'));

function getPhraseParts(adjectives, nouns) {
  return () => {
    const adjective = getPart(adjectives);
    const noun = getPart(nouns);
    return {
      adjective,
      noun,
    };
  };
}

const adjectives =
  'Aching.Active.Agile.Alert.Alien.Alright.Amazing.Ancient.Angry.Antique.Anxious.Aqua.Arctic.Arid.Automatic.Awkward.Bad.Bare.Basic.Big.Bitter.Black.Blank.Bleak.Blind.Blissful.Blonde.Blue.Blushing.Boring.Brave.Brief.Bright.Broken.Bronze.Brown.Bruised.Bulky.Busy.Buzzing.Calm.Candid.Canine.Celtic.Cheap.Chief.Classic.Clean.Clever.Close.Closed.Clumsy.Coarse.Cold.Colossal.Common.Complex.Confused.Cool.Corrupt.Crafty.Crazy.Creepy.Criminal.Crisp.Critical.Crooked.Cruel.Crystal.Cuddly.Damaged.Dangerous.Daring.Dark.Dazzling.Death.Deep.Defiant.Delirious.Dense.Dental.Dessert.Digital.Dim.Direct.Dirty.Discrete.Distant.Dizzy.Double.Dual.Dust.Dusty.Eager.Early.Earnest.Electric.Empty.Enchanted.Enraged.Equal.Euphoric.Evil.Exalted.Exotic.Expert.Faint.Fake.False.Famous.Fancy.Fast.Fat.Fatal.Father.Feisty.Feline.Fickle.Fine.Fire.Firm.First.Fixed.Flat.Flawed.Flawless.Flimsy.Formal.Frail.Fresh.Frigid.Frost.Frozen.Frugal.Funny.Fuzzy.General.Gentle.Giant.Gifted.Giving.Glass.Gleaming.Glorious.Golden.Good.Gorgeous.Graceful.Gracious.Grave.Greedy.Grim.Grizzled.Grizzly.Guilty.Half Vampire.Hairy.Handsome.Happy.Hard.Hasty.Haunting.Hazel.Heavy.Hefty.Helpless.Hidden.High.Hoarse.Hollow.Honest.Honored.Hot.Huge.Humble.Humming.Hungry.Icky.Icy.Idle.Ill.Imaginary.Impish.Impure.Incredible.Infamous.Infinite.Innocent.Iron.Itchy.Jealous.Joint.Jolly.Jumpy.Junior.Keen.Kind.Kosher.Lame.Last.Late.Lazy.Lean.Light.Limp.Little.Lone.Lonely.Long.Lost.Loud.Loving.Low.Loyal.Lucky.Mad.Major.Mellow.Metal.Mild.Minor.Miracle.Misty.Modest.Mother.Murky.Mute.Muted.Naughty.Needy.Nervous.Nice.Numb.Ocean.Odd.Okay.Old.Orange.Original.Pale.Perfect.Pesky.Petty.Pink.Plain.Plastic.Poised.Polar.Polite.Poor.Precious.Pretend.Pretty.Preying.Prime.Programmable.Proud.Purple.Puzzled.Quick.Quiet.Rapid.Rare.Reckless.Red.Rich.Rough.Rude.Sad.Salty.Scarlet.Selfish.Shiny.Shy.Silent.Silver.Sleepy.Slow.Snow.Snowy.Sore.Sour.Stalking.Steel.Sweet.Swift.Tense.Thirsty.Tinted.Tired.Toxic.Twilight.Twin.Twinkle.Urban.Vague.Vicious.Violet.Virtual.Warm.Wavy.Weeping.White.Wicked.Wise.Worried.Yawning.Yellow.Young.Prowling';
const nouns =
  'Acrobat.Angel.Apollo.Arrow.Aurora.Author.Badger.Bagpipe.Bandit.Baron.Baroness.Bat.Bear.Bee.Beehive.Behemoth.Bird.Biscuit.Bishop.Boy Scout.Bulldog.Carpenter.Castle.Centurion.Champion.Chariot.Citadel.Clown.Cobra.Cookie.Crown.Dancer.Darling.Dasher.Demon.Devil.Diamond.Digger.Doctor.Dragon.Dragonfly.Duster.Dynamo.Eagle.Eclipse.Enigma.Eye.Eyes.Falcon.Fiddler.Flamingo.Fox.Foxtail.Frostbite.Geyser.Ghost.Giant.Girl Scout.Grandma.Grandpa.Guardian.Hammer.Harpie.Hawk.Hercules.Hound.Hunter.Hurricane.Jumper.King.Knight.Lancer.Liberty.Lightfoot.Lightning.Lizard.Lotus.Lurker.Mamba.Mantis.Maple.Master.Mercury.Mustang.Neptune.Nighthawk.Ninja.Nurse.Oak.Olympus.Omega.Packer.Panther.Passenger.Patriot.Pawn.Pebble.Phantom.Phoenix.Pig.Pigfish.Pirate.Prince.Prodigy.Queen.Rainbow.Ribbon.Riddler.Roadrunner.Robin.Rogue.Rose.Rosebud.Salesman.Salmon.Sandstorm.Saturn.Serpent.Shadow.Shark.Spectator.Stalker.Star.Starburst.Stardust.Starlight.Stinger.Sun.Sunburn.Sunshine.Supernova.Surgeon.Swordfish.Swordsman.Tailor.Thunder.Tiger.Tinkerbell.Titan.Tower.Trader.Traveler.Tsunami.Tuner.Unicorn.Venus.Vigilant.Volcano.Volunteer.Walker.Warrior.Wasp.Watchdog.Watchman.Whirlwind.Whisper.Widow.Willow.Windigo.Wing.Wings.Witch.Witness.Wizard.Wolf.Wrangler.Zeus.Zion';

module.exports = {
  getPhraseParts: getPhraseParts(adjectives, nouns),
};
