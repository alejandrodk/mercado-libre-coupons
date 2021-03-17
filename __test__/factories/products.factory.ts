import { finance, random } from 'faker';

export const getFakeProduct = (id = random.word()) => ({
  id,
  title: random.words(),
  site_id: 'MLA',
  price: finance.amount(),
});
