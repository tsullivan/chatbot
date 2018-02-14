const { defaultsDeep } = require('lodash');
const { mapFieldToResponse } = require('./map_field_to_response');

const proto = {
  name: null,
  waitingOn: null,
  messages: {
    history: [],
    next: []
  }
};


class ChatSession {
  constructor(session) {
    this.initialized = false;
    this.save = () => {
      defaultsDeep(session, this);
    };
  }

  getInitial() {
    this.initialized = true;
    defaultsDeep(this, proto);
    return this;
  }
  getResumed({ chat }) {
    defaultsDeep(this, chat, proto);
    return this;
  }

  setWaitOnName() {
    this.waitingOn = 'name';
    this.save();
  }

  fulfillWait(response) {
    if (this.waitingOn !== null) {
      const mappedResponse = mapFieldToResponse(this.waitingOn, response);
      if (mappedResponse !== null) {
        this.pushNextBotMessage(mappedResponse);
      }
      this.waitingOn = null;

      this.save();
      return true;
    }
    return false;
  }

  pushNextBotMessage(message) {
    this.messages.next.push(message);
    this.save();
  }

  popNextBotMessage() {
    const nextMessage = this.messages.next.pop();
    if (nextMessage === undefined) {
      return null;
    }
    this.save();
    return nextMessage;
  }
}

module.exports = { ChatSession };
