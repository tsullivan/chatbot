class MultiMap extends Map {
  constructor(...args) {
    super(...args);
    this._aliases = new Map();
  }

  addAlias(aliasName, pointsTo) {
    this._aliases.set(aliasName, pointsTo);
  }

  set(...args) {
    super.set(...args);
  }

  delete(keyOrAlias) {
    const pointsTo = this._aliases.get(keyOrAlias);
    if (pointsTo === undefined) {
      super.delete(keyOrAlias); // not given an alias
    } else {
      super.delete(pointsTo); // given an alias
      this._aliases.delete(keyOrAlias);
    }
  }

  clear() {
    this._aliases.clear();
    super.clear();
  }

  get(keyOrAlias) {
    const pointsTo = this._aliases.get(keyOrAlias);
    if (pointsTo === undefined) {
      return super.get(keyOrAlias);
    }
    return super.get(pointsTo);
  }

  has(keyOrAlias) {
    const pointsTo = this._aliases.get(keyOrAlias);
    if (pointsTo === undefined) {
      return super.has(keyOrAlias);
    }
    return super.has(pointsTo);
  }
}

module.exports = { MultiMap };
