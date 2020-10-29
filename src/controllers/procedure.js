/* eslint-disable no-console */
const express = require('express');
const moment = require('moment');

const db = require('../dbs/index');

async function postSteps(req, res) {
  if (req.body.name === '') {
    return res.status(402).send({ message: 'Some values are missing' });
  }
  const createQuery = `INSERT INTO
      procedures (stepno, step, stepdescription,stepduration,stepimg, recipeid, userid)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

  console.log(req);
  const values = [
    req.body.stepno,
    req.body.step,
    req.body.description,
    req.body.duration,
    req.body.imgurl,
    req.body.recipeid,
    req.user.id,
 ];
  try {
    const { rows } = await db.query(createQuery, values);
    // console.log(rows);
    const data = {
      status: 'success',
      data: {
        message: 'step added successfully​',
        articleId: rows[0].id,
        createdOn: rows[0].step,
        title: rows[0].stepdescription,
      },
    };
    return res.status(201).send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
}

// update article

async function updateStep(req, res) {
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
async function deleteStep(req, res) {
  const deleteQuery = 'DELETE FROM procedures WHERE id=$1 and userid=$2 returning  *';
  // console.log(req.user.id);
  // i'll come back and put & user.id
  try {
    const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
    if (!rows[0]) {
      return res.status(404).send({ message: 'recipe not found' });
    }
    return res.status(200).send({
      status: 'success',
      data: {
        message: 'step successfully deleted',
      },
    });
  } catch (error) {
    return res.status(400).send(error);
  }
}

// select all articles
async function getAll(req, res) {
  const findAllQuery = 'SELECT * FROM procedures where recipeid=$1 ORDER BY id ASC';
  try {
    const { rows } = await db.query(findAllQuery, [req.params.id]);
    return res.status(200).send({ status: 'success', rows });
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = {
  postSteps,
  updateStep,
  deleteStep,
  getAll,
};
