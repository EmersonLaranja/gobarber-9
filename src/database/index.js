// Connect the postgres db and load the models, so they'll be known in any part of the app
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig); // connection with the db

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
