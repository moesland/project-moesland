const mongoose = require('mongoose');

module.exports = () => {
  if (mongoose.connection.readyState === 0) {
    const uri = process.env.MONGODB_URI;
    /* const options = {
      db: { native_parser: true },
      server: { poolSize: 5 },
      replset: { rs_name: 'myReplicaSetName' },
      user: 'admin',
      pass: 'root',
    }; */
    mongoose.connect(uri).catch((err) => {
      console.log(err);
    });
  }

  mongoose.connection.on('open', () => {
    console.log('Connected to mongo server.');

    mongoose.connection.db.listCollections().toArray((err, names) => {
      console.log({ names, err });
    });
  });

  return mongoose;
};
