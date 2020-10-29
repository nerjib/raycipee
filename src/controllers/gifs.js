/* eslint-disable no-console */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
const express = require('express');
const moment = require('moment');
const dotenv = require('dotenv');

const router = express.Router();


const db = require('../dbs/index');

async function createGif(req, res, gifUrl) {
  const createQuery = `INSERT INTO
      gifs (userid, title, gifurl, createdon)
      VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [
    req.user.id,
    req.body.title,
    gifUrl,
    moment(new Date()),
  ];
  try {
    const { rows } = await db.query(createQuery, values);
    console.log(req.user.id);
    const data = {
      status: 'success',
      data: {
        message: 'Gif successfully posted​',
        gifID: rows[0].id,
        createdon: rows[0].createdon,
        title: rows[0].title,
        url: rows[0].gifurl,
      },
    };
    return res.status(201).send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
}

async function postGifComment(req, res) {
// console.log(req.body);
  const createQuery = `INSERT INTO gifComments
              (userid, comment, gifid, post_date)
            VALUES($1, $2, $3, $4)
            returning *`;
  const values = [
    // uuidv4(),
    req.user.id,
    req.body.comment,
    req.params.id,
    moment(new Date()),
  ];
  try {
    const { rows } = await db.query(createQuery, values);
    console.log(rows);
    const response = {
      status: 'success',
      data: {
        message: 'Comment successfully created',
        createdOn: rows[0].post_date,
        comment: rows[0].comment,
      },
    };
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).send(error);
  }
}
async function deleteGif(req, res) {
  const deleteQuery = 'DELETE FROM gifs WHERE id=$1 AND userid = $2 returning *';
  // console.log(req.user.id);
  try {
    const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
    if (!rows[0]) {
      return res.status(404).send({ message: 'Article is not yours, you cant delete it' });
    }
    return res.status(200).send({ message: 'Gif successfully deleted' });
  } catch (error) {
    return res.status(400).send(error);
  }
}

// get all gifs
async function getGif(req, res) {
  const findAllQuery = 'SELECT * FROM gifs';
  try {
    const { rows } = await db.query(findAllQuery);
    return res.status(200).send({ status: 'success', rows });
  } catch (error) {
    return res.status(400).send(error);
  }
}
async function getOne(req, res) {
  const text = 'SELECT * FROM gifs WHERE id = $1';
  // const text = 'SELECT articles.article, comments.comment FROM articles INNER JOIN comments ON
  // article.id=comments.userid';
  const gifComment = 'SELECT * FROM gifcomments WHERE gifid= $1';
  // console.log(req.params.id);
  try {
    const { rows } = await db.query(text, [req.params.id]);
    if (!rows[0]) {
      return res.status(404).send({ message: 'Article Not found' });
    }
    const artRows = await db.query(gifComment, [req.params.id]);
    const data = {
      status: 'success',
      data: {
        rows,
        comments: artRows.rows,
      },
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).send(error);
  }
}


dotenv.config();

module.exports = {
  getOne,
  getGif,
  router,
  createGif,
  postGifComment,
  deleteGif,
};
