CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    location_id INTEGER,
    name VARCHAR(100) NOT NULL,

    constraint fk_location_id
        FOREIGN KEY (location_id)
        REFERENCES locations (id)
)

CREATE TABLE holes (
    id SERIAL PRIMARY KEY,
    course_id INTEGER,
    -- which number this hole is on the course
    course_order SMALLINT,
    par SMALLINT,

    constraint fk_course_id
        FOREIGN KEY (course_id)
        REFERENCES courses (id)
);
