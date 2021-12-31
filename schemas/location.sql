CREATE TABLE locations (
  id   BIGSERIAL PRIMARY KEY,
  name TEXT      NOT NULL
);

CREATE TABLE holes (
  id BIGSERIAL PRIMARY KEY,
  number SMALLINT,
  name TEXT,
  par SMALLINT
);
