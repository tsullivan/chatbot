export class MultiMap extends Map {
  private aliases: Map<any, any>;

  public constructor() {
    super();
    this.aliases = new Map();
  }

  public addAlias(aliasName: string, pointsTo: string): this {
    this.aliases.set(aliasName, pointsTo);
    return this;
  }

  public set(key: any, value: any): this {
    super.set(key, value);
    return this;
  }

  public delete(keyOrAlias: string): boolean {
    const pointsTo = this.aliases.get(keyOrAlias);
    if (pointsTo === undefined) {
      return super.delete(keyOrAlias); // not given an alias
    } else {
      const superD = super.delete(pointsTo); // given an alias
      const thisD = this.aliases.delete(keyOrAlias);
      return superD && thisD;
    }
  }

  public clear() {
    this.aliases.clear();
    super.clear();
  }

  public get(keyOrAlias: string) {
    const pointsTo = this.aliases.get(keyOrAlias);
    if (pointsTo === undefined) {
      return super.get(keyOrAlias);
    }
    return super.get(pointsTo);
  }

  public has(keyOrAlias: string) {
    const pointsTo = this.aliases.get(keyOrAlias);
    if (pointsTo === undefined) {
      return super.has(keyOrAlias);
    }
    return super.has(pointsTo);
  }
}
