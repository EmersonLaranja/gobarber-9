import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    // db config by database/index connection variable
    // automatically called by sequelize
    super.init(
      {
        // columns inside the db
        // calling the init function inside the Model
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            // how i wanna set the value
            return `http://localhost:3333/files/${this.path}`;
          },
        },
      },
      { sequelize }
    );

    return this; // returns the model  that has just been initialized
  }
}

export default File;
