CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    course_id INTEGER,

    constraint fk_course_id
        FOREIGN KEY (course_id)
        REFERENCES courses (id)
);

CREATE TABLE match_participants (
    id SERIAL PRIMARY KEY,
    account_id INTEGER NOT NULL,
    match_id INTEGER NOT NULL,

    constraint fk_account_id
        FOREIGN KEY (account_id)
        REFERENCES accounts (id),

    constraint fk_match_id
        FOREIGN KEY (match_id)
        REFERENCES matches (id)
);

CREATE TABLE match_strokes (
    id SERIAL PRIMARY KEY,
    account_id INTEGER NOT NULL,
    match_id INTEGER NOT NULL,
    hole_id INTEGER NOT NULL,
    -- which number the hole is for the match
    match_order SMALLINT NOT NULL,
    strokes SMALLINT NOT NULL DEFAULT 0,

    constraint fk_account_id
        FOREIGN KEY (account_id)
        REFERENCES accounts (id),

    constraint fk_match_id
        FOREIGN KEY (match_id)
        REFERENCES matches (id),

    constraint fk_hole_id
        FOREIGN KEY (hole_id)
        REFERENCES holes (id)
);
