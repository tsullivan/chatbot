export interface PersonOpts {
  born?: number;
  died?: number;
}

export class Person {
  public name: string;
  private attributes: PersonOpts;

  public constructor(name: string, opts?: PersonOpts) {
    this.name = name;
    this.attributes = opts || {};
  }

  public get died() {
    return this.attributes.died ? this.attributes.died : null;
  }

  public get born() {
    return this.attributes.born ? this.attributes.born : null;
  }
}
