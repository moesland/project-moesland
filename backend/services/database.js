const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = async () => {
  if (process.env.NODE_ENV === 'test') {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connected to memory mongo database.');
  }

  if (process.env.NODE_ENV !== 'test' && mongoose.connection.readyState === 0) {
    const uri = process.env.MONGODB_URI;
    
    await mongoose.connect(uri).catch((err) => {
      console.log(err);
    });

    mongoose.connection.on('open', () => {
      console.log('Connected to mongo database.');

      mongoose.connection.db.listCollections().toArray((err, names) => {
        console.log({ names, err });
      });
    });
  }

  return mongoose;
};
