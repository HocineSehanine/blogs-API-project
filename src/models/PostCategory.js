module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory',{
      categoryId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: 'posts_categories',
      underscored: true,
    });
    PostCategory.associate = (models) => {
      models.Category.belongsToMany(models.BlogPost, {
        as: 'blog_posts',
        otherKey: 'postId',
        foreignKey: 'categoryId',
        through: PostCategory,

      });
  
      models.BlogPost.belongsToMany(models.Category, {
        as: 'categories',
        otherKey: 'categoryId',
        foreignKey: 'postId',
        through: PostCategory,

      });
    }

    return PostCategory;
  }