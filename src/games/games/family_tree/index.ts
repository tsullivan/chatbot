import { Adventure, KeywordResponse, Location, getFamilyTree } from '../../lib';
import { Session } from '../../../bot';

function getLocations(game: Adventure): Record<string, Location> {
  const makeLocation = (name: string, description: string) =>
    new class FamilyLocation extends Location {
      public getDescription() {
        return description;
      }
      public setLocationKeywords() {
        this.addKeyword('FAMILY_TREE', 'See the family tree', () => {
          const familyTree = getFamilyTree();
          return new KeywordResponse({
            text: familyTree.render(),
          });
        });
      }
    }({ game, name });

  return {
    palmLnLocation: makeLocation(
      '1322 W Palm Ln, Phoenix',
      `This is where Henry and Robin live in 2019!`
    ),

    ojaiLocation: makeLocation(
      'Ojai, California',
      `This is where Henry's Nana and Grampy Sullivan live.`
    ),
    southwestPortlandLocation: makeLocation(
      'SW Portland, Oregon',
      `This is where Henry's Nana and Grampy Sullivan live.`
    ),
    southeastPortlandLocation: makeLocation(
      'SE Portland, Oregon',
      `This is where Henry's Ong Ngoai and Ba Ngoai live.`
    ),
    vietnamLocation: makeLocation(
      'Nga Trang, Vietnam',
      `This is where Henry's mother was born`
    ),
    santaCruzLocation: makeLocation(
      'Felton, California',
      `This is where Henry's cousin Aliyah lives`
    ),
    ohioLocation: makeLocation(
      'Ohio, United States',
      `This is where Henry's father was born`
    ),
  };
}

export default class FamilyTreeGame extends Adventure {
  public constructor(session: Session) {
    super(session);
    this.setName('family_tree');
    const locations = getLocations(this);

    this.postInit = () => {
      this.setLocation(locations.palmLnLocation);
    };
  }
}
