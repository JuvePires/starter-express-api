const joi = require("joi");

const validarCorpoRequisicao = (joiSchema) => (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      throw error;
    }

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};
module.exports = validarCorpoRequisicao;
