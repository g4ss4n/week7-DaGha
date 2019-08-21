BEGIN;

    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS results CASCADE;

    CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(15),
        password VARCHAR,
        first_name VARCHAR(30),
        last_name VARCHAR (30));

    CREATE TABLE results(
        user_id INTEGER NOT NULL,
        q1 INTEGER NOT NULL,
        q2 INTEGER NOT NULL,
        q3 INTEGER NOT NULL,
        q4 INTEGER NOT NULL,
        result VARCHAR(100));

    INSERT INTO users (username,password,first_name,last_name)
    VALUES
    ('g4ss4n', '123456' ,'Ghassan', 'Gharzuzy'),
    ('danafalah', '123456' , 'Dana', 'Falah');

    INSERT INTO results (user_id,q1,q2,q3,q4,result)
    VALUES
        (1, 3, 2, 3, 1, 'Handsome, lovely, handsome again ofc'),
        (2, 3, 2, 4, 1, 'ugly, so damn UGLY');

    COMMIT;