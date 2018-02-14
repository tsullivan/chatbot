class Responder {
  constructor() {
    this.response = null;
  }

  setPlain(message) {
    this.response = {
      format: 'plain',
      message
    };

    return this.response;
  }
}

module.exports = { Responder };
