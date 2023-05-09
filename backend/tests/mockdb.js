const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const mockdb = {
  mongoServer: new MongoMemoryServer(),
  mongocon: mongoose,

  connect: async () => {
    this.mongoServer = await MongoMemoryServer.create();
    this.mongocon = await mongoose.connect(this.mongoServer.getUri());
  },
  disconnect: async () => {
    if (this.mongoServer) {
      await this.mongoServer.stop();
    }
    if (this.mongocon) {
      await this.mongocon.close();
    }
  },
};

module.exports = {
  mockdb,
};
