/* eslint-disable no-console */
const express = require('express');
const moment = require('moment');

const db = require('../dbs/index');

async function postArticle(req, res) {
  const createQuery = `INSERT INTO
      articles (userid, title, article, createdon)
      VALUES ($1, $2, $3, $4) RETURNING *`;
  console.log(req);
  const values = [
    req.user.id,
    req.body.title,
    req.body.article,
    moment(new Date()),
  ];
  try {
    const { rows } = await db.query(createQuery, values);
    // console.log(rows);
    const data = {
      status: 'success',
      data: {
        message: 'Article successfully posted​',
        articleId: rows[0].id,
        createdOn: rows[0].createdon,
        title: rows[0].title,
      },
    };
    return res.status(201).send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
}

// update article

async function updateArticle(req, res) {
  const findOneQuery = 'SELECT * FROM articles WHERE id=$1 AND userid = $2';
  const updateOneQuery = `UPDATE articles
      SET article=$1 WHERE id=$2  AND  userid=$3 RETURNING *`;
  try {
    const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
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
async function deleteArticle(req, res) {
  const deleteQuery = 'DELETE FROM articles WHERE id=$1 and userid=$2 returning  *';
  // console.log(req.user.id);
  // i'll come back and put & user.id
  try {
    const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
    if (!rows[0]) {
      return res.status(404).send({ message: 'Article not found' });
    }
    return res.status(200).send({
      status: 'success',
      data: {
        message: 'Article successfully deleted',
      },
    });
  } catch (error) {
    return res.status(400).send(error);
  }
}

// add comment
async function postComment(req, res)  {
  const createQuery = `INSERT INTO comments
            (userid, comment, articleid, post_date)
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
    const response = {
      status: 'success',
      data: {
        message: 'Comment successfully created',
        createdOn: rows[0].post_date,
        comment: rows[0].comment,
      },
    };
    return res.status(201).send(response);
  } catch (error) {
    return res.status(400).send(error);
  }
}

// select all articles
async function getAll(req, res) {
  const findAllQuery = 'SELECT * FROM articles ORDER BY createdon DESC';
  try {
    const { rows } = await db.query(findAllQuery);
    return res.status(200).send({ status: 'success', rows });
  } catch (error) {
    return res.status(400).send(error);
  }
}


async function getOne(req, res) {
  const text = 'SELECT * FROM articles WHERE id = $1';
  // const text = 'SELECT articles.article, comments.comment FROM articles INNER JOIN comments ON
  // article.id=comments.userid';
  const articleComment = 'SELECT * FROM comments WHERE articleid= $1';
  console.log(req.params.id);
  try {
    const { rows } = await db.query(text, [req.params.id]);
    if (!rows[0]) {
      return res.status(404).send({ message: 'Article Not found' });
    }
    const artRows = await db.query(articleComment, [req.params.id]);
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

module.exports = {
  postArticle,
  updateArticle,
  deleteArticle,
  getAll,
  getOne,
  postComment,
};
