DROP DATABASE IF EXISTS notes;
CREATE DATABASE notes;

\c notes;

CREATE TABLE notesTable (
  ID SERIAL PRIMARY KEY,
  creationTime timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title VARCHAR,
  description VARCHAR,
  color VARCHAR
);

INSERT INTO notesTable (title, description, color)
  VALUES ('TestTitle', 'testDescription', '#ffc');
 