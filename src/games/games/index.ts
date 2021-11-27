import { GameSet } from '../lib';
import Adventure from './adventure';
import Batman from './batman';
import BubbleGun from './bubble_gun';
import EscapeJail from './escape_jail';
import FamilyTree from './family_tree';
import GuessNumber from './guess_number';
import Hiking from './hiking';
import IronManAndSpidey from './iron_man_and_spidey';

export function getGames(): GameSet {
  return {
    adventure: Adventure,
    batman: Batman,
    bubble_gun: BubbleGun,
    escape_jail: EscapeJail,
    family_tree: FamilyTree,
    guess_number: GuessNumber,
    hiking: Hiking,
    iron_man_and_spidey: IronManAndSpidey,
  };
}

