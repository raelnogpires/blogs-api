const user = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false, tableName: 'Users' });

  User.associate = (models) => {
    User.hasMany(models.BlogPosts, {
      foreignKey: 'userId', as: 'BlogPosts',
    });
  };

  return User;
};

module.exports = user;