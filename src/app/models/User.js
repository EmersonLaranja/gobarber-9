import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    // db config by database/index connection variable
    // automatically called by sequelize
    super.init(
      {
        // columns inside the db
        // calling the init function inside the Model
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // It won't exist in our db, only in the development environment
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async (user) => {
      // executed automatically based on what happens in our models
      if (user.password) {
        // editing or creating a new user
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this; // returns the model  that has just been initialized
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id' }); // User model belongs to File model, it means that we have an avatar_id inside of our user
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash); // return a boolean
  }
}

export default User;
