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

-- name: CreateLocation :one
INSERT INTO locations (
  name
) VALUES (
  $1
)
RETURNING *;

-- name: CreateHole :one
INSERT INTO holes (
  number, name,  par
) VALUES (
  $1, $2, $3
)
RETURNING *;