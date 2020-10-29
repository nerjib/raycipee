/* eslint-disable no-console */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
const dotenv = require('dotenv');
const db = require('../dbs/index');
// get all gifs
async function getAll(req, res) {
  const findAllQuery = 'SELECT t1.article, t2.gifurl FROM articles AS t1 JOIN gifs AS t2';
  try {
    const { rows } = await db.query(findAllQuery);
    return res.status(200).send({ status: 'success', rows });
  } catch (error) {
    return res.status(400).send(error);
  }
}


dotenv.config();

module.exports = {
  getAll,
};
