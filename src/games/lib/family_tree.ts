import { Person } from './person';

interface PersonTree {
  name: string;
  person: Person;
  mother?: Person | PersonTree;
  father?: Person | PersonTree;
  husband?: Person;
  wife?: Person;
  boyfriend?: Person;
  siblings?: (Person | PersonTree)[];
  children?: Person[];
}

export function getFamilyTree() {
  const henrySullivan = new Person('Henry Nguyen Sullivan');
  const timSullivan = new Person('Timothy Donald Sullivan');
  const danSullivan = new Person('Dan Sullivan');

  const henryTree: PersonTree = {
    name: henrySullivan.name,
    person: henrySullivan,
    mother: (() => {
      const uyenNguyen = new Person('Uyen Ngyuen');
      return {
        name: uyenNguyen.name,
        person: uyenNguyen,
        mother: (() => {
          const ngaNgo = new Person('Ba Ngoai (Nga Ngo)');
          return {
            name: ngaNgo.name,
            person: ngaNgo,
            mother: new Person('Nhung Nguyen'),
            father: ((): PersonTree => {
              const name = 'Thuan Ngo';
              return {
                name,
                person: new Person(name),
              };
            })(),
            siblings: [
              ((): PersonTree => {
                const name = 'Di Hai (Kieu Ngo)';
                return {
                  name,
                  person: new Person(name),
                  children: [
                    new Person('Quyen Le'),
                    new Person('Thinh Le'),
                    new Person('Binh Le'),
                  ],
                };
              })(),
              new Person('Di Tu (Lai Ngo)'),
              new Person('Cau Nam (Thanh Ngo)'),
              new Person('Di Sau (Lieu Ngo)'),
              new Person('Cau Bay (Tu "Teo" Ngo)'),
              ((): PersonTree => {
                const name = 'Di Tam (Ngoc Ngo)';
                return {
                  name,
                  person: new Person(name),
                  children: [new Person('Kelly Schooler')],
                };
              })(),
              new Person('Cau Chin (Hon Ngo)'),
            ],
          };
        })(),
        father: (() => {
          const tanNguyen = new Person('Ong Ngoai (Tan Nguyen)');
          return {
            name: tanNguyen.name,
            person: tanNguyen,
            mother: ((): PersonTree => {
              const name = 'Nhung Nguyen';
              return {
                name,
                person: new Person(name),
                children: [
                  new Person('Bac Hai (Trinh Le)'),
                  new Person('Bac Ba'), // b date, d date
                  new Person('Chu Nam (Giao Nguyen)'),
                  new Person('Co Sau (Hoa Nguyen)'),
                  new Person('Co Bay (Yen Nguyen)'),
                  new Person('Chu Tam (Son Nguyen)'),
                ],
              };
            })(),
          };
        })(),
      };
    })(),
    father: {
      name: timSullivan.name,
      person: timSullivan,
      mother: (() => {
        const cariRiegel = new Person('Carolyn "Grandma Cari" Riegel');
        return {
          name: cariRiegel.name,
          person: cariRiegel,
          boyfriend: new Person('Robert "Bobby" Benson'),
          mother: (() => {
            const shirleyRiegel = new Person('Shirley "Grandma GeeGee" Riegel');
            return {
              name: shirleyRiegel.name,
              person: shirleyRiegel,
              father: new Person('Grandpa Briggs'),
            };
          })(),
          father: (() => {
            const donRiegel = new Person('Don "Grandpa D" Riegel');
            return {
              name: donRiegel.name,
              person: donRiegel,
            };
          })(),
          siblings: [
            (() => {
              const veraHamrick = new Person('Vera Hamrick');
              return {
                name: veraHamrick.name,
                person: veraHamrick,
                husband: new Person('Charles "Chuck" Hamrick'),
                children: [
                  new Person('Abigail "Abby" Winters'),
                  new Person('Charles "Chase" Hamrick'),
                  new Person('Adriana Vogle'),
                ],
              };
            })(),
            (() => {
              const marionCox = new Person('Marion Cox');
              return {
                name: marionCox.name,
                person: marionCox,
                husband: new Person('Jeffrey Cox'),
                children: [
                  new Person('Billy Cox'),
                  new Person('Jason Cox'),
                  new Person('Jessie Waugh'),
                ],
              };
            })(),
          ],
        };
      })(),
      father: (() => {
        const raySullivan = new Person('Raymond "Grampy" Sullivan');
        return {
          name: raySullivan.name,
          person: raySullivan,
          wife: new Person('Carole "Nana" Sullivan'),
          children: [danSullivan],
          father: new Person('James "Great Grampy" Sullivan'),
          mother: new Person('Estelle "Great Nana" Sullivan'),
          siblings: [
            ((): PersonTree => {
              const name = 'Mary Hernandez';
              return {
                name,
                husband: new Person('Pedro Hernandez'),
                person: new Person(name),
                children: [new Person('Santiago')],
              };
            })(),
            new Person('George'),
            ((): PersonTree => {
              const name = 'Jim Sullivan';
              return {
                name,
                person: new Person(name),
                children: [
                  new Person('Jennifer'),
                  new Person('Joe Sullivan'),
                  new Person('Eva'),
                ],
              };
            })(),
            ((): PersonTree => {
              const name = 'Estelle Parker';
              return {
                name,
                person: new Person(name),
                husband: new Person('Alan Parker'),
              };
            })(),
            ((): PersonTree => {
              const name = 'Gail Bocian';
              return {
                name,
                person: new Person(name),
                husband: new Person('Rick Bocian'),
                children: [new Person('Brian'), new Person('Beth'), new Person('Joe')],
              };
            })(),
            ((): PersonTree => {
              const name = 'Kathleen Fuller';
              return {
                name,
                person: new Person(name),
                husband: new Person('Jim Fuller'),
                children: [new Person('Quinn'), new Person('Zack')],
              };
            })(),
            ((): PersonTree => {
              const name = 'Pat Johnson';
              return {
                name,
                person: new Person(name),
                husband: new Person('Tom Johnson'),
              };
            })(),
            new Person('Christine'),
            ((): PersonTree => {
              const name = 'Michelle Niklas';
              return {
                name,
                person: new Person(name),
                children: [new Person('Sara'), new Person('Rachel')],
              };
            })(),
            ((): PersonTree => {
              const name = 'Jeanne';
              return {
                name,
                person: new Person(name),
                children: [
                  new Person('Shane'),
                  new Person('Johnny'),
                  new Person('Jacob'),
                ],
              };
            })(),
            new Person('Tim'),
          ],
        };
      })(),
      siblings: [
        danSullivan,
        (() => {
          const melissaSullivan = new Person('Melissa Sullivan');
          return {
            name: melissaSullivan.name,
            person: melissaSullivan,
            children: [new Person('Aliyah James')],
          };
        })(),
      ],
    },
    siblings: [new Person('Robin Vy Sullivan')],
  };

  function renderTree(p: PersonTree, indent: string = '') {
    let accum = p.name;
    let nIndent = indent + '  ';
    if (p.siblings != null) {
      accum += `\n${indent}- Siblings`;
      for (const sibling of p.siblings) {
        accum += `\n${nIndent}- ` + renderTree(sibling as PersonTree, nIndent + '  ');
      }
    }
    if (p.children != null) {
      accum += `\n${indent}- Children`;
      for (const child of p.children) {
        accum += `\n${nIndent}- ` + renderTree(child as PersonTree, nIndent + '  ');
      }
    }
    if (p.husband != null) {
      accum +=
        `\n${indent}- Husband: ` + renderTree(p.husband as PersonTree, nIndent + '  ');
    }
    if (p.mother != null) {
      accum +=
        `\n${indent}- Mother: ` + renderTree(p.mother as PersonTree, nIndent + '  ');
    }
    if (p.father != null) {
      accum +=
        `\n${indent}- Father: ` + renderTree(p.father as PersonTree, nIndent + '  ');
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
