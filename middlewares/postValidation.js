const { BAD_REQUEST, UNAUTHORIZED, NOT_FOUND } = require('./httpStatusCode');
const { getAll } = require('../services/categoryService');
const { getById } = require('../services/postService');

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

const categoryIdValidation = async (req, _res, next) => {
  const { categoryIds } = req.body;

  if (!categoryIds) {
    return next({ code: BAD_REQUEST, message: '"categoryIds" is required' });
  }

  const allCategories = await getAll();

  categoryIds.forEach((c) => {
    const exist = allCategories.find((i) => i.dataValues.id === c);
    if (!exist) {
      return next({ code: BAD_REQUEST, message: '"categoryIds" not found' });
    }
  });

  return next();
};

const categoriesValidation = async (req, _res, next) => {
  const { categoryIds } = req.body;

  if (categoryIds) {
    return next({ code: BAD_REQUEST, message: 'Categories cannot be edited' });
  }

  return next();
};

const userValidation = async (req, _res, next) => {
  const { id } = req.params;

  const { result } = await getById(id);

  if (!result) {
    return next({ code: NOT_FOUND, message: 'Post does not exist' });
  }

  if (result.userId !== req.userId) {
    return next({ code: UNAUTHORIZED, message: 'Unauthorized user' });
  }

  return next();
};

const postExistValidation = async (req, _res, next) => {
  const { id } = req.params;

  const { result } = await getById(id);

  if (!result) {
    return next({ code: NOT_FOUND, message: 'Post does not exist' });
  }

  return next();
};

module.exports = {
  titleAndContentValidation,
  categoryIdValidation,
  categoriesValidation,
  userValidation,
  postExistValidation,
};
