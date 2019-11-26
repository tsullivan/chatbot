import { Person } from './person';

interface Branch<T> {
  name: string;
  person?: Person;
  mother?: T | Branch<T>;
  father?: T | Branch<T>;
  husband?: T;
  wife?: T;
  boyfriend?: T;
  siblings?: (T | Branch<T>)[];
  children?: (T | Branch<T>)[];
}

export function getFamilyTree() {
  const tree: Branch<Person> = {
    name: null,
    person: null,
    mother: (() => {
      const uyenNguyen = new Person('Uyen Ngyuen', { born: 1981 });
      return {
        name: uyenNguyen.name,
        person: uyenNguyen,
        children: [
          new Person('Henry Nguyen Sullivan'),
          new Person('Robin Vy Sullivan'),
        ],
        mother: (() => {
          const ngaNgo = new Person('Ba Ngoai (Nga Ngo)', { born: 1953 });
          return {
            name: ngaNgo.name,
            person: ngaNgo,
            mother: new Person('Nhung Nguyen'),
            father: new Person('Thuan Ngo'),
            siblings: [
              (() => {
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
              (() => {
                const name = 'Cau Nam (Thanh Ngo)';
                return {
                  name,
                  person: new Person(name),
                  children: [
                    new Person('Linh Ngo'),
                    new Person('Hao Ngo'),
                    new Person('Y Ngo'),
                  ],
                };
              })(),
              new Person('Di Sau (Lieu Ngo)'),
              (() => {
                const name = 'Cau Bay (Tu "Teo" Ngo)';
                return {
                  name,
                  person: new Person(name),
                  children: [new Person('Anh Ngo'), new Person('Nguyen Ngo')],
                };
              })(),
              (() => {
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
          const tanNguyen = new Person('Ong Ngoai (Tan Nguyen)', { born: 1951 });
          return {
            name: tanNguyen.name,
            person: tanNguyen,
            mother: (() => {
              const name = 'Nhung Nguyen';
              return {
                name,
                person: new Person(name),
                children: [
                  (() => {
                    const haiName = 'Bac Hai (Trinh Le)';
                    return {
                      name: haiName,
                      person: new Person(haiName),
                      children: [new Person('Patrick Le')],
                    };
                  })(),
                  new Person('Bac Ba'), // b date, d date
                  new Person('Chu Nam (Giao Nguyen)'),
                  new Person('Co Sau (Hoa Nguyen'),
                  (() => {
                    const sauName = 'Co Bay (Yen Nguyen)';
                    return {
                      name: sauName,
                      person: new Person(sauName),
                      children: [new Person('Quan Nguyen'), new Person('Minu Nguyen')],
                    };
                  })(),
                  (() => {
                    const tamName = 'Chu Tam (Son Nguyen)';
                    return {
                      name: tamName,
                      person: new Person(tamName),
                      children: [new Person('Nhung Nguyen'), new Person('Nhu Nguyen')],
                    };
                  })(),
                ],
              };
            })(),
          };
        })(),
      };
    })(),
    father: (() => {
      const timSullivan = new Person('Timothy Donald Sullivan', { born: 1980 });
      return {
        name: timSullivan.name,
        person: timSullivan,
        mother: (() => {
          const cariRiegel = new Person('Carolyn "Grandma Cari" Riegel', {
            born: 1959,
          });
          return {
            name: cariRiegel.name,
            person: cariRiegel,
            boyfriend: new Person('Robert "Bobby" Benson'),
            mother: (() => {
              const shirleyRiegel = new Person('Shirley "Grandma GeeGee" Riegel');
              return {
                name: shirleyRiegel.name,
                person: shirleyRiegel,
                father: new Person('Great-Great Grandpa Briggs'),
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
          const raySullivan = new Person('Raymond "Grampy" Sullivan', { born: 1960 });
          return {
            name: raySullivan.name,
            person: raySullivan,
            wife: new Person('Carole "Nana" Sullivan'),
            father: new Person('James "Great Grampy" Sullivan'),
            mother: new Person('Estelle "Great Nana" Sullivan'),
            siblings: [
              (() => {
                const name = 'Mary Hernandez';
                return {
                  name,
                  husband: new Person('Pedro Hernandez'),
                  person: new Person(name),
                  children: [new Person('Santiago')],
                };
              })(),
              new Person('George Sullivan'),
              (() => {
                const name = 'Jim Sullivan';
                return {
                  name,
                  person: new Person(name),
                  children: [
                    new Person('Jennifer'),
                    new Person('Joe Sullivan'),
                    new Person('Eva'),
                  ],
                  wife: new Person('Jenelle Sullivan', { died: 2003 }),
                };
              })(),
              (() => {
                const name = 'Estelle Parker';
                return {
                  name,
                  person: new Person(name),
                  husband: new Person('Alan Parker'),
                };
              })(),
              (() => {
                const name = 'Gail Bocian';
                return {
                  name,
                  person: new Person(name),
                  husband: new Person('Rick Bocian'),
                  children: [
                    new Person('Brian'),
                    new Person('Beth'),
                    new Person('Joe'),
                  ],
                };
              })(),
              (() => {
                const name = 'Kathleen Fuller';
                return {
                  name,
                  person: new Person(name),
                  husband: new Person('Jim Fuller'),
                  children: [
                    new Person('Quinn', { born: 1979 }),
                    new Person('Zack'),
                    new Person('Cory'),
                  ],
                };
              })(),
              (() => {
                const name = 'Pat Johnson';
                return {
                  name,
                  person: new Person(name),
                  husband: new Person('Tom Johnson'),
                  children: [new Person('Michael'), new Person('Sara')],
                };
              })(),
              (() => {
                const name = 'Christine Callahan';
                return {
                  name,
                  person: new Person(name),
                  children: [new Person('Shawna'), new Person('Jake')],
                };
              })(),
              (() => {
                const name = 'Michelle Niklas';
                return {
                  name,
                  person: new Person(name),
                  children: [new Person('Sara'), new Person('Rachel')],
                  husband: new Person('Jack Niklas'),
                };
              })(),
              (() => {
                const name = 'Jean Sullivan';
                return {
                  name,
                  person: new Person(name),
                  children: [
                    new Person('Shane', { born: 1980 }),
                    new Person('Johnny'),
                    new Person('Jacob'),
                  ],
                };
              })(),
              new Person('Tim Sullivan', { died: 1990 }),
            ],
          };
        })(),
        siblings: [
          new Person('Daniel Ryan Sullivan', { born: 1988 }),
          (() => {
            const melissaSullivan = new Person('Melissa Sullivan', { born: 1981 });
            return {
              name: melissaSullivan.name,
              person: melissaSullivan,
              children: [new Person('Aliyah James', { born: 2013 })],
            };
          })(),
        ],
      };
    })(),
  };

  function renderTree(p1: Branch<Person>, indent: string = '') {
    let accum;
    const p = p1.person || (p1 as Person);

    accum = p.name ? p.name : '';
    if (p.born) {
      accum += ` [born: ${p.born}]`;
    }
    if (p.died) {
      accum += ` [died: ${p.died}]`;
    }
    let nIndent = indent + '  ';

    const pB = p1 as Branch<Person>;
    if (pB.mother != null) {
      accum += `\n${indent}- Mother: ` + renderTree(pB.mother, nIndent + '  ');
    }
    if (pB.father != null) {
      accum += `\n${indent}- Father: ` + renderTree(pB.father, nIndent + '  ');
    }
    if (pB.children != null) {
      accum += `\n${indent}- Children`;
      for (const child of pB.children) {
        accum += `\n${nIndent}- ` + renderTree(child, nIndent + '  ');
      }
    }
    if (pB.siblings != null) {
      accum += `\n${indent}- Siblings`;
      for (const sibling of pB.siblings) {
        accum += `\n${nIndent}- ` + renderTree(sibling, nIndent + '  ');
      }
    }
    if (pB.husband != null) {
      accum += `\n${indent}- Husband: ` + renderTree(pB.husband, nIndent + '  ');
    }
    if (pB.wife != null) {
      accum += `\n${indent}- Wife: ` + renderTree(pB.wife, nIndent + '  ');
    }
    if (pB.boyfriend != null) {
      accum += `\n${indent}- Boyfriend: ` + renderTree(pB.boyfriend, nIndent + '  ');
    }

    return accum;
  }

  return {
    familyTree: tree,
    render() {
      return renderTree(tree);
    },
  };
}
