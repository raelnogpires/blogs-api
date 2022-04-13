const BlogPosts = (sequelize, DataTypes) => {
  const blogposts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: false, tableName: 'BlogPosts' });

  blogposts.associate = (models) => {
    blogposts.belongsTo(models.User, {
      foreignKey: 'userId', as: 'User',
    });
  };

  return blogposts;
};

module.exports = BlogPosts;