import { Adventure, Location, Person } from '../../lib';
import { Session } from '../../../bot';

function getLocations(game: Adventure): Record<string, Location> {
  return {
    palmLnLocation: new class PalmLnLocation extends Location {
      public getDescription() {
        return `This is where Henry and Robin live in 2019!`;
      }
    }({ game, name: '1322 W Palm Ln, Phoenix' }),
    ojaiLocation: new class OjaiLocation extends Location {
      public getDescription() {
        return `This is where Henry's Nana and Grampy Sullivan live.`;
      }
    }({ game, name: 'Ojai, California' }),
    southwestPortlandLocation: new class SouthwestPortlandLocation extends Location {
      public getDescription() {
        return `This is where Henry's Nana and Grampy Sullivan live.`;
      }
    }({ game, name: 'SW Portland, Oregon' }),
    southeastPortlandLocation: new class SoutheastPortlandLocation extends Location {
      public getDescription() {
        return `This is where Henry's Ong Ngoai and Ba Ngoai live.`;
      }
    }({ game, name: 'SE Portland, Oregon' }),
    vietnamLocation: new class VietnamLocation extends Location {
      public getDescription() {
        return `This is where Henry's mother was born`;
      }
    }({ game, name: 'Nga Trang, Vietnam' }),
    ohioLocation: new class OhioLocation extends Location{
      public getDescription() {
        return `This is where Henry's father was born`;
      }
    }({ game, name: 'Ohio, United States' }),
  };
}

function getSetup(game: Adventure) {
  return () => {
    const { palmLnLocation, ojaiLocation, southwestPortlandLocation,
      southeastPortlandLocation, vietnamLocation } = getLocations(game);
    this.setLocation(palmLnLocation);

    const personLocationMap: Map<Person, Location> = new Map();

    const henrySullivan = new Person('Henry Nguyen Sullivan');
    const robinSullivan = new Person('Robin Vy Sullivan');
    const uyenNguyen = new Person('Uyen Bich Ngyuen');
    const timSullivan = new Person('Timothy Donald Sullivan');

    const raySullivan = new Person('Raymond Robert Sullivan');
    const caroleSullivan = new Person('Carole Jane Sullivan');
    const cariRiegel = new Person('Carolyn (Cari) Leslie Riegel');
    const bobby = new Person('Robert (Bobby) Benson');

    const melissaSullivan = new Person('Melissa Ann Sullivan');
    const aliyahJames = new Person('Aliyah James');
    const danSullivan = new Person('Daniel Ryan Sullivan');

    const ngaNgo = new Person('Me Nga Ngo (Nancy)');
    const tanNguyen = new Person('Ba Tan Nguyen (Tom)');

    // Ngo
    const kieuNgo = new Person('Di Hai: Kieu Ngo (2)');
    const quyenLe = new Person('Quyen Le, # 1 daughter');
    const thinhLe = new Person('Thinh Le, # 2 son');
    const binhLe = new Person('Binh Le, # 3 son');


    const tuongNgo = new Person('Cau Nam (5): Tuong Ngo');
    const lieuNgo = new Person('Di Sau (6): Lieui Ngo');
    const teoNgo = new Person('Cau Bay (7): Teo Ngo');

    const ngocNgo = new Person('Di Tam (8): Ngoc Ngo');
    const kellySchooler = new Person('Kelly Schooler');

    const laiNgo = new Person('Di Tu (4): Lai Ngo'); // portland
    const honNgo = new Person('Cau Chin (9): Hon Ngo'); // portland

    const nhungNguyen = new Person('Nhung Nguyen'); // maternal grandmother

    // Nguyen
    const trinhLe = new Person('Bac Hai (2), Trinh Le'); // portland
    const sonNguyen = new Person('Chu Tam (8), Son Nguyen'); // portland

    const yenNguyen = new Person('Co Bay'); // 7 yen nguyen, co bay // vietnam
    const coSau = new Person('Co Sau'); // 6 ???, co sau // vietnam

    personLocationMap.set(henrySullivan, palmLnLocation);
    personLocationMap.set(robinSullivan, palmLnLocation);
    personLocationMap.set(uyenNguyen, palmLnLocation);
    personLocationMap.set(timSullivan, palmLnLocation);

    personLocationMap.set(raySullivan, ojaiLocation);
    personLocationMap.set(caroleSullivan, ojaiLocation);

    personLocationMap.set(cariRiegel, southwestPortlandLocation);
    personLocationMap.set(bobby, southwestPortlandLocation);

    personLocationMap.set(ngaNgo, southeastPortlandLocation);
    personLocationMap.set(tanNguyen, southeastPortlandLocation);
    personLocationMap.set(ngocNgo, southeastPortlandLocation);
    personLocationMap.set(kellySchooler, southeastPortlandLocation);
    personLocationMap.set(laiNgo, southeastPortlandLocation);
    personLocationMap.set(honNgo, southeastPortlandLocation);

    personLocationMap.set(kieuNgo, vietnamLocation);
    personLocationMap.set(quyenLe, vietnamLocation);
    personLocationMap.set(thinhLe, vietnamLocation);
    personLocationMap.set(binhLe, vietnamLocation);
    personLocationMap.set(tuongNgo, vietnamLocation);
    personLocationMap.set(lieuNgo, vietnamLocation);
    personLocationMap.set(teoNgo, vietnamLocation);
    personLocationMap.set(nhungNguyen, vietnamLocation);
    personLocationMap.set(yenNguyen, vietnamLocation);
    personLocationMap.set(coSau, vietnamLocation);

    return [henrySullivan, robinSullivan, uyenNguyen, timSullivan, raySullivan,
      caroleSullivan, cariRiegel, bobby, melissaSullivan, aliyahJames,
      danSullivan, ngaNgo, tanNguyen, kieuNgo, quyenLe, thinhLe, binhLe,
      laiNgo, ngocNgo, kellySchooler, tuongNgo, lieuNgo, teoNgo, honNgo,
      nhungNguyen, trinhLe, sonNguyen, yenNguyen, coSau];
  };
}

export default class FamilyTreeGame extends Adventure {
  public constructor(session: Session) {
    super(session);
    this.setName('family_tree');
    this.postInit = getSetup(this);
  }
}
