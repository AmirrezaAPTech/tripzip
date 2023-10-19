/* eslint-disable import/no-dynamic-require */
const mongoose = require('mongoose');
const path = require('path');

const config = require(path.resolve(__dirname, '../config.js'));
const logger = require('../utils/logger/logger');

const mongoURI = config.MongodbUri;

async function clearDatabase() {
  if (config.NodeEnv === 'testing') {
    try {
      await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

      const collections = await mongoose.connection.db.collections();

      const clearPromises = collections.map(async (collection) => {
        await collection.deleteMany({});
      });

      await Promise.all(clearPromises);

      logger.info('Test DB cleared');
      await mongoose.connection.close();
    } catch (error) {
      logger.error(error);
    }
  }
}

(async () => {
  await clearDatabase();
})();