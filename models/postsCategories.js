const PostsCategories = (sequelize, DataTypes) => {
  const postsCategories = sequelize.define('PostsCategories', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  }, { timestamps: false, tableName: 'PostsCategories' });

  postsCategories.associate = (models) => {
    models.Categories.belongsToMany(models.BlogPosts, {
      foreignKey: 'categoryId', otherKey: 'postId', through: 'PostCategories', as: 'BlogPosts',
    });
  };

  postsCategories.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categories, {
      foreignKey: 'postId', otherKey: 'categoryId', through: 'PostCategories', as: 'Categories',
    });
  };

  return postsCategories;
};

module.exports = PostsCategories;