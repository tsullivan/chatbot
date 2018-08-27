window.HistoryRecaller = class {
  constructor() {
    this._userMessages = [];
    this.save();
  }

  resetPointer() {
    this._pointer = Math.max(0, this._userMessages.length - 1);
  }

  rewindPointer() {
    this._pointer = Math.max(0, this._pointer - 1);
  }

  save() {
    this.resetPointer();
    localStorage.setItem('user_messages', JSON.stringify(this._userMessages));
  }

  addHistory(text) {
    this._userMessages.push(text);
    return this.save();
  }

  getEarlierText() {
    const lastMessage = this._userMessages[this._pointer];
    this.rewindPointer();
    return lastMessage ? lastMessage : '';
  }
};
