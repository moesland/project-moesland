const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const mockdb = {
  mongoServer: new MongoMemoryServer(),
  connection: mongoose,

  connect: async () => {
    this.mongoServer = await MongoMemoryServer.create();
    this.connection = mongoose.createConnection(this.mongoServer.getUri());
  },
  disconnect: async () => {
    if (this.mongoServer) {
      await this.mongoServer.stop();
    }
    if (this.connection) {
      await this.connection.close();
    }
  },
};

module.exports = {
  mockdb,
};
