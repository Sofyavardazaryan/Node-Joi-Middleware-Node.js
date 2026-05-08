const { registerSchema } = require("../schema/register");

const checkBody = async (req, res, next) => {
  try {
    const validateBody = await registerSchema.validateAsync(req.body);
    res.locals.validateBody = validateBody;
    next();
  } catch (error) {
    res.json(error.message);
  }
};

module.exports.checkBody = checkBody;
