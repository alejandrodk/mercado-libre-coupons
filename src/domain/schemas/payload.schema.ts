import Joi from 'joi';

const productPatter = '^(MLA)\\d+';

export const PayloadSchema = Joi.object({
  items_ids: Joi.array().items(Joi.string().pattern(RegExp(productPatter)).required()),
  amount: Joi.number(),
});
