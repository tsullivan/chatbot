import { Location } from './location';
import { Person } from './person';

interface PersonTree {
  name: string;
  person: Person;
  mother?: Person | PersonTree;
  father?: Person | PersonTree;
  husband?: Person;
  wife?: Person;
  boyfriend?: Person;
  siblings?: Person[];
  children?: Person[];
}

export function getPersonLocationMap(
  people: Record<string, Person>,
  locations: Record<string, Location>
) {
  const {
    henrySullivan,
    robinSullivan,
    uyenNguyen,
    timSullivan,
    raySullivan,
    caroleSullivan,
    cariRiegel,
    bobby,
    melissaSullivan,
    aliyahJames,
    danSullivan,
    ngaNgo,
    tanNguyen,
    kieuNgo,
    quyenLe,
    thinhLe,
    binhLe,
    laiNgo,
    ngocNgo,
    kellySchooler,
    tuongNgo,
    lieuNgo,
    teoNgo,
    honNgo,
    nhungNguyen,
    trinhLe,
    sonNguyen,
    yenNguyen,
    coSau,
  } = people;
  const {
    palmLnLocation,
    ojaiLocation,
    santaCruzLocation,
    denverLocation,
    southwestPortlandLocation,
    southeastPortlandLocation,
    vietnamLocation,
  } = locations;
  const personLocationMap: Map<Person, Location> = new Map();

  personLocationMap.set(henrySullivan, palmLnLocation);
  personLocationMap.set(robinSullivan, palmLnLocation);
  personLocationMap.set(uyenNguyen, palmLnLocation);
  personLocationMap.set(timSullivan, palmLnLocation);

  personLocationMap.set(raySullivan, ojaiLocation);
  personLocationMap.set(caroleSullivan, ojaiLocation);

  personLocationMap.set(melissaSullivan, santaCruzLocation);
  personLocationMap.set(aliyahJames, santaCruzLocation);
  personLocationMap.set(danSullivan, denverLocation);

  personLocationMap.set(cariRiegel, southwestPortlandLocation);
  personLocationMap.set(bobby, southwestPortlandLocation);

  personLocationMap.set(ngaNgo, southeastPortlandLocation);
  personLocationMap.set(tanNguyen, southeastPortlandLocation);
  personLocationMap.set(ngocNgo, southeastPortlandLocation);
  personLocationMap.set(kellySchooler, southeastPortlandLocation);
  personLocationMap.set(laiNgo, southeastPortlandLocation);
  personLocationMap.set(honNgo, southeastPortlandLocation);
  personLocationMap.set(trinhLe, southeastPortlandLocation);
  personLocationMap.set(sonNguyen, southeastPortlandLocation);

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
}

export function getFamilyTree() {
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

  const ngocTree: PersonTree = {
    name: ngocNgo.name,
    person: ngocNgo,
    children: [kellySchooler],
  };
  const ngaTree: PersonTree = {
    name: ngaNgo.name,
    person: ngaNgo,
    mother: nhungNguyen,
    siblings: [
      kieuNgo,
      quyenLe,
      thinhLe,
      binhLe,
      tuongNgo,
      lieuNgo,
      teoNgo,
      ngocTree,
      laiNgo,
      honNgo,
    ],
  };
  const tanTree: PersonTree = {
    name: tanNguyen.name,
    person: tanNguyen,
    siblings: [trinhLe, sonNguyen, yenNguyen, coSau],
  };
  const uyenTree: PersonTree = {
    name: uyenNguyen.name,
    person: uyenNguyen,
    husband: timSullivan,
    mother: ngaTree,
    father: tanTree,
  };
  const cariTree: PersonTree = {
    name: cariRiegel.name,
    person: cariRiegel,
    boyfriend: bobby,
  };

  const rayTree: PersonTree = {
    name: raySullivan.name,
    person: raySullivan,
    wife: caroleSullivan,
    children: [danSullivan],
  };

  const melissaTree: PersonTree = {
    name: melissaSullivan.name,
    person: melissaSullivan,
    children: [aliyahJames],
  };
  const timTree: PersonTree = {
    name: timSullivan.name,
    person: timSullivan,
    wife: uyenNguyen,
    mother: cariTree,
    father: rayTree,
    siblings: [danSullivan, melissaTree],
  };
  const henryTree: PersonTree = {
    name: henrySullivan.name,
    person: henrySullivan,
    mother: uyenTree,
    father: timTree,
    siblings: [robinSullivan],
  };

  function renderTree(p: PersonTree, indent: string= '') {
    let accum = p.name;
    let nIndent = indent + '  ';
    if (p.siblings != null) {
      accum += `\n${indent}- Siblings`;
      for (const sibling of p.siblings) {
        accum += `\n${nIndent}- ` + renderTree(sibling as PersonTree, nIndent + ' ');
      }
    }
    if (p.children != null) {
      accum += `\n${indent}- Children`;
      for (const child of p.children) {
        accum += `\n${nIndent}- ` + renderTree(child as PersonTree, nIndent + ' ');
      }
    }
    if (p.mother != null) {
      accum += `\n${indent}- Mother: ` + renderTree(p.mother as PersonTree, nIndent + ' ');
    }
    if (p.father != null) {
      accum += `\n${indent}- Father: ` + renderTree(p.father as PersonTree, nIndent + ' ');
    }

    return accum;
  }

  let rendering = renderTree(henryTree);

  return {
    familyTree: henryTree,
    render() {
      return rendering;
    },
  };
}
