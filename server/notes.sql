DROP DATABASE IF EXISTS notes;
CREATE DATABASE notes;

\c notes;

CREATE TABLE notesTable (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  description VARCHAR
);

INSERT INTO notesTable (title, description)
  VALUES ('TestTitle', 'testDescription');
