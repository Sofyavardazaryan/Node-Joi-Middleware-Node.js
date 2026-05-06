const { loginSchema } = require("../schema/login");

const checkLogin = async (req, res, next) => {
  try {
    const validateBody = await loginSchema.validateAsync(req.body);
    res.locals.validateBody = validateBody;
    next();
  } catch (error) {
    res.json(error.message);
  }
};

module.exports.checkLogin = checkLogin;