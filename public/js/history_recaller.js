window.HistoryRecaller = class {
  constructor() {
    const stored = localStorage.getItem('user_messages');
    if (stored != null) {
      this._userMessages = JSON.parse(localStorage.getItem('user_messages'));
    } else {
      this._userMessages = [];
    }
    this.resetPointer();
  }

  resetPointer() {
    this._pointer = -1;
  }

  save() {
    this._userMessages.length = Math.min(25, this._userMessages.length); // keep only up to 25 things
    this.resetPointer();
    localStorage.setItem('user_messages', JSON.stringify(this._userMessages));
  }

  addHistory(text) {
    this._userMessages.unshift(text);
    this.save();
  }

  getLaterText() {
    this._pointer = Math.max(0, this._pointer - 1);
    const lastMessage = this._userMessages[this._pointer];
    return lastMessage ? lastMessage : '';
  }

  getEarlierText() {
    this._pointer = Math.min(this._userMessages.length - 1, this._pointer + 1);
    const nextMessage = this._userMessages[this._pointer];
    return nextMessage ? nextMessage : '';
  }
};
