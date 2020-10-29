/* eslint-disable no-console */
const express = require('express');
const moment = require('moment');

const db = require('../dbs/index');

async function postIngredient(req, res) {
  if (req.body.name === '') {
    return res.status(402).send({ message: 'Some values are missing' });
  }
  const createQuery = `INSERT INTO
      ingredients (name, quantity, recipeid)
      VALUES ($1, $2, $3) RETURNING *`;

  console.log(req);
  const values = [
    req.body.name,
    req.body.quantity,
    req.body.recipeid,
 ];
  try {
    const { rows } = await db.query(createQuery, values);
    // console.log(rows);
    const data = {
      status: 'success',
      data: {
        message: 'recipe successfully posted​',
        articleId: rows[0].id,
        createdOn: rows[0].createdon,
        title: rows[0].title,
        category: rows[0].category,
      },
    };
    return res.status(201).send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
}

// update article

async function updateIngredients(req, res) {
  const findOneQuery = 'SELECT * FROM articles WHERE id=$1';
  const updateOneQuery = `UPDATE articles
      SET article=$1 WHERE id=$2  AND  userid=$3 RETURNING *`;
  try {
    const { rows } = await db.query(findOneQuery, [req.params.id]);
    if (!rows[0]) {
      return res.status(404).send({ message: 'Article not found' });
    }
    console.log(rows[0].id);
    const values = [
      req.body.article || rows[0].article,
      rows[0].id,
      req.user.id,
    ];
    const { response } = await db.query(updateOneQuery, values);
    console.log(response);
    const ress = {
      status: 'success',
      data: {
        message: 'article successfully updated',
        title: req.body.title,
        article: req.body.article,
      },
    };
    return res.status(200).send(ress);
  } catch (err) {
    return res.status(400).send('article not updated');
  }
}

// delete an article
async function deleteIngredient(req, res) {
  const deleteQuery = 'DELETE FROM ingredients WHERE id=$1 returning  *';
  // console.log(req.user.id);
  // i'll come back and put & user.id
  try {
    const { rows } = await db.query(deleteQuery, [req.params.id]);
    if (!rows[0]) {
      return res.status(404).send({ message: 'recipe not found' });
    }
    return res.status(200).send({
      status: 'success',
      data: {
        message: 'Recipe successfully deleted',
      },
    });
  } catch (error) {
    return res.status(400).send(error);
  }
}

// select all articles
async function getAll(req, res) {
  const findAllQuery = 'SELECT * FROM ingredients where recipeid=$1 ORDER BY id ASC';
  try {
    const { rows } = await db.query(findAllQuery, [req.params.id]);
    return res.status(200).send({ status: 'success', rows });
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = {
  postIngredient,
  updateIngredients,
  deleteIngredient,
  getAll,
};
