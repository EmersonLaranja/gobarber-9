import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    // db config by database/index connection variable
    // automatically called by sequelize
    super.init(
      {
        // columns inside the db
        // calling the init function inside the Model
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      { sequelize }
    );

    return this; // returns the model  that has just been initialized
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Appointment;
