const categories = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    name: DataTypes.STRING,
  }, { timestamps: false, tableName: 'Categories' });

  return Categories;
};

module.exports = categories;