'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DataBarang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DataBarang.init({
    nama: DataTypes.STRING,
    namaBarang: DataTypes.STRING,
    nomorHP: DataTypes.STRING,
    destination: DataTypes.STRING,
    tracking_number: DataTypes.STRING,
    weight: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'DataBarang',
  });
  return DataBarang;
};