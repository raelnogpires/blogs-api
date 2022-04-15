const { BAD_REQUEST } = require('./httpStatusCode');
const Categories = require('../services/categoryService');

const titleAndContentValidation = async (req, _res, next) => {
  const { title, content } = req.body;

  if (!title) {
    return next({ code: BAD_REQUEST, message: '"title" is required' });
  }

  if (!content) {
    return next({ code: BAD_REQUEST, message: '"content" is required' });
  }

  return next();
};

const categoryIdValidation = async (req, res, next) => {
  const { categoryIds } = req.body;

  if (!categoryIds) {
    return next({ code: BAD_REQUEST, message: '"categoryIds" is required' });
  }

  const allCategories = await Categories.getAll();

  categoryIds.forEach((c) => {
    const exist = allCategories.find((i) => i.dataValues.id === c);
    if (!exist) {
      return next({ code: BAD_REQUEST, message: '"categoryIds" not found' });
    }
  });

  return next();
};

module.exports = {
  titleAndContentValidation,
  categoryIdValidation,
};