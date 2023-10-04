'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dataTracking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dataTracking.init({
    nama: DataTypes.STRING,
    nomorHP: DataTypes.STRING,
    namaBarang: DataTypes.STRING,
    destination: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    trackingNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dataTracking',
  });
  return dataTracking;
};