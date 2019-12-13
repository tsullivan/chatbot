import { Person, PersonOpts } from '../games/lib/person';

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

const p = (name: string, opts?: PersonOpts) => new Person(name, opts);

export function getFamilyTree() {
  const tree: Branch<Person> = {
    mother: {
      person: p('Uyen Ngyuen', { born: 1981 }),
      children: [
        p('Henry Nguyen Sullivan', { born: 2012 }),
        p('Robin Vy Sullivan', { born: 2019 }),
      ],
      mother: {
        person: p('Ba Ngoai (Nga Ngo)', { born: 1953 }),
        mother: p('Nhung Nguyen', { died: 2007 }),
        father: p('Thuan Ngo'),
        siblings: [
          {
            person: p('Di Hai (Kieu Ngo)'),
            children: [
              p('Quyen Le', { born: 1978 }),
              p('Thinh Le', { born: 1980 }),
              p('Dinh Le', { born: 1982 }),
            ],
          },
          p('Di Tu (Lai Ngo)'),
          {
            person: p('Cau Nam (Thanh Ngo)'),
            children: [p('Linh Ngo'), p('Hao Ngo'), p('Y Ngo')],
          },
          p('Di Sau (Lieu Ngo)'),
          {
            person: p('Cau Bay (Tu "Teo" Ngo)'),
            children: [p('Anh Ngo'), p('Nguyen Ngo')],
          },
          {
            person: p('Di Tam (Ngoc Ngo)'),
            children: [p('Kelly Schooler', { born: 2002 })],
          },
          p('Cau Chin (Hon Ngo)'),
        ],
      },
      father: {
        person: p('Ong Ngoai (Tan Nguyen)', { born: 1951 }),
        mother: {
          person: p('Nhung Nguyen'),
          children: [
            {
              person: p('Bac Hai (Trinh Le)'),
              children: [p('Patrick Le')],
            },
            p('Bac Ba'),
            p('Chu Nam (Giao Nguyen)'),
            p('Co Sau (Hoa Nguyen'),
            {
              person: p('Co Bay (Yen Nguyen)'),
              children: [p('Quan Nguyen'), p('Minu Nguyen')],
            },
            {
              person: p('Chu Tam (Son Nguyen)'),
              children: [p('Nhung Nguyen'), p('Nhu Nguyen')],
            },
          ],
        },
      },
    },
    father: {
      person: p('Timothy Donald Sullivan', { born: 1980 }),
      mother: {
        person: p('Carolyn "Grandma Cari" Riegel', { born: 1959 }),
        boyfriend: p('Robert "Bobby" Benson'),
        mother: {
          person: p('Shirley "Grandma GeeGee" Riegel'),
          father: p('Great-Great Grandpa Briggs'),
        },
        father: {
          person: p('Don "Grandpa D" Riegel'),
        },
        siblings: [
          {
            person: p('Vera Hamrick'),
            husband: p('Charles "Chuck" Hamrick'),
            children: [
              p('Abigail "Abby" Winters', { born: 1981 }),
              p('Charles "Chase" Hamrick', { born: 1983 }),
              p('Adriana Vogle', { born: 1985 }),
            ],
          },
          {
            person: p('Marion Cox'),
            husband: p('Jeffrey Cox'),
            children: [p('Billy Cox'), p('Jason Cox'), p('Jessie Waugh')],
          },
        ],
      },
      father: {
        person: p('Raymond "Grampy" Sullivan', { born: 1960 }),
        wife: p('Carole "Nana" Sullivan'),
        father: p('James "Great Grampy" Sullivan'),
        mother: p('Estelle "Great Nana" Sullivan'),
        siblings: [
          {
            person: p('Mary Hernandez'),
            husband: p('Pedro Hernandez'),
            children: [p('Santiago')],
          },
          p('George Sullivan'),
          {
            person: p('Jim Sullivan'),
            children: [p('Jennifer'), p('Joe Sullivan'), p('Eva')],
            wife: p('Jenelle Sullivan', { died: 2003 }),
          },
          {
            person: p('Estelle Parker'),
            husband: p('Alan Parker'),
            children: [p('Daniel')],
          },
          {
            person: p('Gail Bocian'),
            husband: p('Rick Bocian'),
            children: [p('Brian'), p('Beth'), p('Joe')],
          },
          {
            person: p('Kathleen Fuller'),
            husband: p('Jim Fuller'),
            children: [
              p('Quinn', { born: 1979 }),
              p('Zack', { born: 1981 }),
              p('Cory', { born: 1983 }),
            ],
          },
          {
            person: p('Pat Johnson'),
            husband: p('Tom Johnson'),
            children: [p('Michael'), p('Laura')],
          },
          {
            person: p('Christine Callahan'),
            children: [p('Shawna'), p('Jake')],
          },
          {
            person: p('Michelle Niklas'),
            children: [p('Sara'), p('Rachel')],
            husband: p('Jack Niklas'),
          },
          {
            person: p('Jean Sullivan'),
            children: [p('Shane', { born: 1980 }), p('Johnny'), p('Jacob')],
          },
          p('Tim Sullivan', { died: 1990 }),
        ],
      },
      siblings: [
        p('Daniel Ryan Sullivan', { born: 1988 }),
        {
          person: p('Melissa Sullivan', { born: 1981 }),
          children: [p('Aliyah James', { born: 2014 })],
        },
      ],
    },
  };

  function isPerson(obj: Person | Branch<Person>): obj is Person {
    return (obj as Person).name !== undefined;
  }

  function isBranch(obj: Person | Branch<Person>): obj is Branch<Person> {
    return (obj as Branch<Person>).person.name !== undefined;
  }

  function renderTree(p1: Person | Branch<Person>, indent: string = '') {
    let accum;

    let name;
    if (isPerson(p1)) {
      name = p1.name;
    } else if (isBranch(p1)) {
      name = p1.person.name;
    }

    accum = name ? name : '';
    if (isPerson(p1) && p1.born) {
      accum += ` [born: ${p1.born}]`;
    }
    if (isPerson(p1) && p1.died) {
      accum += ` [died: ${p1.died}]`;
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
