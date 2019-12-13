import { Person } from './person';

interface Branch<T> {
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
    mother: {
      person: new Person('Uyen Ngyuen', { born: 1981 }),
      children: [
        new Person('Henry Nguyen Sullivan', { born: 2012 }),
        new Person('Robin Vy Sullivan', { born: 2019 }),
      ],
      mother: {
        person: new Person('Ba Ngoai (Nga Ngo)', { born: 1953 }),
        mother: new Person('Nhung Nguyen', { died: 2007 }),
        father: new Person('Thuan Ngo'),
        siblings: [
          {
            person: new Person('Di Hai (Kieu Ngo)'),
            children: [
              new Person('Quyen Le', { born: 1978 }),
              new Person('Thinh Le', { born: 1980 }),
              new Person('Dinh Le', { born: 1982 }),
            ],
          },
          new Person('Di Tu (Lai Ngo)'),
          {
            person: new Person('Cau Nam (Thanh Ngo)'),
            children: [
              new Person('Linh Ngo'),
              new Person('Hao Ngo'),
              new Person('Y Ngo'),
            ],
          },
          new Person('Di Sau (Lieu Ngo)'),
          {
            person: new Person('Cau Bay (Tu "Teo" Ngo)'),
            children: [new Person('Anh Ngo'), new Person('Nguyen Ngo')],
          },
          {
            person: new Person('Di Tam (Ngoc Ngo)'),
            children: [new Person('Kelly Schooler', { born: 2002 })],
          },
          new Person('Cau Chin (Hon Ngo)'),
        ],
      },
      father: {
        person: new Person('Ong Ngoai (Tan Nguyen)', { born: 1951 }),
        mother: {
          person: new Person('Nhung Nguyen'),
          children: [
            {
              person: new Person('Bac Hai (Trinh Le)'),
              children: [new Person('Patrick Le')],
            },
            new Person('Bac Ba'), // b date, d date
            new Person('Chu Nam (Giao Nguyen)'),
            new Person('Co Sau (Hoa Nguyen'),
            {
              person: new Person('Co Bay (Yen Nguyen)'),
              children: [new Person('Quan Nguyen'), new Person('Minu Nguyen')],
            },
            {
              person: new Person('Chu Tam (Son Nguyen)'),
              children: [new Person('Nhung Nguyen'), new Person('Nhu Nguyen')],
            },
          ],
        },
      },
    },
    father: {
      person: new Person('Timothy Donald Sullivan', { born: 1980 }),
      mother: {
        person: new Person('Carolyn "Grandma Cari" Riegel', { born: 1959 }),
        boyfriend: new Person('Robert "Bobby" Benson'),
        mother: {
          person: new Person('Shirley "Grandma GeeGee" Riegel'),
          father: new Person('Great-Great Grandpa Briggs'),
        },
        father: {
          person: new Person('Don "Grandpa D" Riegel'),
        },
        siblings: [
          {
            person: new Person('Vera Hamrick'),
            husband: new Person('Charles "Chuck" Hamrick'),
            children: [
              new Person('Abigail "Abby" Winters'),
              new Person('Charles "Chase" Hamrick'),
              new Person('Adriana Vogle'),
            ],
          },
          {
            person: new Person('Marion Cox'),
            husband: new Person('Jeffrey Cox'),
            children: [
              new Person('Billy Cox'),
              new Person('Jason Cox'),
              new Person('Jessie Waugh'),
            ],
          },
        ],
      },
      father: {
        person: new Person('Raymond "Grampy" Sullivan', { born: 1960 }),
        wife: new Person('Carole "Nana" Sullivan'),
        father: new Person('James "Great Grampy" Sullivan'),
        mother: new Person('Estelle "Great Nana" Sullivan'),
        siblings: [
          {
            person: new Person('Mary Hernandez'),
            husband: new Person('Pedro Hernandez'),
            children: [new Person('Santiago')],
          },
          new Person('George Sullivan'),
          {
            person: new Person('Jim Sullivan'),
            children: [
              new Person('Jennifer'),
              new Person('Joe Sullivan'),
              new Person('Eva'),
            ],
            wife: new Person('Jenelle Sullivan', { died: 2003 }),
          },
          {
            person: new Person('Estelle Parker'),
            husband: new Person('Alan Parker'),
          },
          {
            person: new Person('Gail Bocian'),
            husband: new Person('Rick Bocian'),
            children: [
              new Person('Brian'),
              new Person('Beth'),
              new Person('Joe'),
            ],
          },
          {
            person: new Person('Kathleen Fuller'),
            husband: new Person('Jim Fuller'),
            children: [
              new Person('Quinn', { born: 1979 }),
              new Person('Zack'),
              new Person('Cory'),
            ],
          },
          {
            person: new Person('Pat Johnson'),
            husband: new Person('Tom Johnson'),
            children: [new Person('Michael'), new Person('Sara')],
          },
          {
            person: new Person('Christine Callahan'),
            children: [new Person('Shawna'), new Person('Jake')],
          },
          {
            person: new Person('Michelle Niklas'),
            children: [new Person('Sara'), new Person('Rachel')],
            husband: new Person('Jack Niklas'),
          },
          {
            person: new Person('Jean Sullivan'),
            children: [
              new Person('Shane', { born: 1980 }),
              new Person('Johnny'),
              new Person('Jacob'),
            ],
          },
          new Person('Tim Sullivan', { died: 1990 }),
        ],
      },
      siblings: [
        new Person('Daniel Ryan Sullivan', { born: 1988 }),
        {
          person: new Person('Melissa Sullivan', { born: 1981 }),
          children: [new Person('Aliyah James', { born: 2014 })],
        },
      ],
    },
  };

  function renderTree(p1: Person | Branch<Person>, indent: string = '') {
    let accum;
    const branch = p1 as Branch<Person>;
    const person = branch.person ? branch.person : p1 as Person;

    let name;
    if (person.name) {
      name = person.name;
    } else if (branch.person && branch.person.name) {
      name = branch.person.name;
    }
    accum = name ? name : '';
    if (person.born) {
      accum += ` [born: ${person.born}]`;
    }
    if (person.died) {
      accum += ` [died: ${person.died}]`;
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
