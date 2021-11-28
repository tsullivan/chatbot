import { Adventure, KeywordResponse, Location } from '../lib';
import { Session } from '../../bot';
import { getFamilyTree } from '../../lib';

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
      `This is where Nana and Grampy Sullivan live.`
    ),
    southwestPortlandLocation: makeLocation(
      'SW Portland, Oregon',
      `This is where Nana and Grampy Sullivan live.`
    ),
    southeastPortlandLocation: makeLocation(
      'SE Portland, Oregon',
      `This is where Ong Ngoai and Ba Ngoai live.`
    ),
    vietnamLocation: makeLocation(
      'Nga Trang, Vietnam',
      `This is where Mom was born`
    ),
    santaCruzLocation: makeLocation(
      'Felton, California',
      `This is where cousin Aliyah lives`
    ),
    ohioLocation: makeLocation(
      'Ohio, United States',
      `This is where Dad was born`
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
