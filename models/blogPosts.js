const blogposts = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: false, tableName: 'BlogPosts' });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.User, {
      foreignKey: 'userId', as: 'User',
    });
  };

  return BlogPosts;
};

module.exports = blogposts;