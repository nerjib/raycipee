 CREATE TABLE students (id SERIAL PRIMARY KEY, name TEXT);
  
  CREATE TABLE IF NOT EXISTS users ( id SERIAL PRIMARY KEY, fName VARCHAR(100) NOT NULL,lName VARCHAR(100) Null,username VARCHAR(100) NOT NULL, pword TEXT NOT NULL, email VARCHAR(100) UNIQUE NOT NULL,role VARCHAR(100) Null, sex VARCHAR(100) NOT NULL, address VARCHAR(255) NULL,created_date TIMESTAMP );

CREATE TABLE IF NOT EXISTS articles(id SERIAL PRIMARY KEY, userId INT NOT NULL, title VARCHAR(128) NOT NULL, article TEXT NOT NULL, createdOn TIMESTAMP, FOREIGN KEY (userId) REFERENCES users(id));

INSERT INTO users (fname, username, pword, email, role, dept, address) VALUES ('user1','user21','11','user@gmail.com','staff','it','kd');

CREATE TABLE IF NOT EXISTS comments(id SERIAL PRIMARY KEY, userid INT NOT NULL, comment TEXT NOT NULL, articleid INTEGER NOT NULL, post_date TIMESTAMP, FOREIGN KEY (articleid) REFERENCES articles(id));

CREATE TABLE IF NOT EXISTS gifs(id SERIAL PRIMARY KEY, userId INT NOT NULL, title VARCHAR(128) NOT NULL, gifUrl TEXT NOT NULL, createdOn TIMESTAMP, FOREIGN KEY (userId) REFERENCES users(id));

CREATE TABLE IF NOT EXISTS gifComments(id SERIAL PRIMARY KEY, userid INT NOT NULL, comment TEXT NOT NULL, gifID INTEGER NOT NULL, post_date TIMESTAMP, FOREIGN KEY (gifid) REFERENCES gifs(id));
 