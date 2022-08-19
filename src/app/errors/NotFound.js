class NotFound extends Error {
    constructor(name) {
      super(`${name} não encontrado`);
      this.name = 'Not Found';
    }
  }
  
  module.exports = NotFound;