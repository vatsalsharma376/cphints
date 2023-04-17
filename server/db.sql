CREATE TABLE temphint(thid SERIAL PRIMARY KEY, hints TEXT[], upvote INTEGER, downvote INTEGER,uid INTEGER, qid INTEGER, qlink VARCHAR(255), FOREIGN KEY (uid) REFERENCES users(id), FOREIGN KEY (qid) REFERENCES question(qid));

CREATE TABLE question (qid SERIAL PRIMARY KEY, qlink1 VARCHAR(255),qlink2 VARCHAR(255), platform VARCHAR(255), qname VARCHAR(255));

CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(512), handle VARCHAR(255), color VARCHAR(25), username VARCHAR(255));

CREATE TABLE hint(hid SERIAL PRIMARY KEY, hints TEXT[], upvote INTEGER, downvote INTEGER,uid INTEGER, qid INTEGER, FOREIGN KEY (uid) REFERENCES users(id), FOREIGN KEY (qid) REFERENCES question(qid));
