CREATE TABLE temphint(thid SERIAL PRIMARY KEY, hints TEXT[], upvote INTEGER, downvote INTEGER,uid INTEGER, qid INTEGER, qlink VARCHAR(255), FOREIGN KEY (uid) REFERENCES users(id), FOREIGN KEY (qid) REFERENCES question(qid));

CREATE TABLE question (qid SERIAL PRIMARY KEY, qlink1 VARCHAR(255),qlink2 VARCHAR(255), platform VARCHAR(255), qname VARCHAR(255));

CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(512), handle VARCHAR(255), color VARCHAR(25), username VARCHAR(255));

CREATE TABLE hint(hid SERIAL PRIMARY KEY, hints TEXT[], upvote INTEGER, downvote INTEGER,uid INTEGER, qid INTEGER, FOREIGN KEY (uid) REFERENCES users(id), FOREIGN KEY (qid) REFERENCES question(qid));

CREATE TABLE hint(
  hid SERIAL PRIMARY KEY, 
  hints TEXT[] CHECK (
    array_length(hints, 1) >= 2 
    AND hints[1] <> '' 
    AND hints[2] <> ''
  ), 
  upvote INTEGER CHECK (upvote >= 0), 
  downvote INTEGER CHECK (downvote >= 0), 
  uid INTEGER NOT NULL, 
  qid INTEGER NOT NULL, 
  FOREIGN KEY (uid) REFERENCES users(id), 
  FOREIGN KEY (qid) REFERENCES question(qid)
);
CREATE TABLE temphint(
  thid SERIAL PRIMARY KEY, 
  hints TEXT[] CHECK (
    array_length(hints, 1) >= 2 
    AND hints[1] <> '' 
    AND hints[2] <> ''
  ), 
  upvote INTEGER CHECK (upvote >= 0), 
  downvote INTEGER CHECK (downvote >= 0), 
  uid INTEGER NOT NULL, 
  qid INTEGER NOT NULL, 
  qlink VARCHAR(255) NOT NULL CHECK (qlink <> ''), 
  FOREIGN KEY (uid) REFERENCES users(id), 
  FOREIGN KEY (qid) REFERENCES question(qid)
);
CREATE TABLE users (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255) NOT NULL CHECK (name <> ''), 
  email VARCHAR(255) NOT NULL CHECK (email <> ''), 
  password VARCHAR(512) NOT NULL CHECK (password <> ''), 
  username VARCHAR(255) NOT NULL CHECK (username <> '')
);
CREATE TABLE question (
  qid SERIAL PRIMARY KEY, 
  qlink1 VARCHAR(255) NOT NULL CHECK (qlink1 <> ''), 
  qlink2 VARCHAR(255) NOT NULL CHECK (qlink2 <> ''), 
  platform VARCHAR(255) NOT NULL CHECK (platform <> ''), 
  qname VARCHAR(255) NOT NULL CHECK (qname <> '')
);

