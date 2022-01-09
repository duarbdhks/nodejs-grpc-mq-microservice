CREATE TYPE genders AS ENUM ('male', 'female');

create table if not exists newsletter
(
    nid        SERIAL PRIMARY KEY,
    title      VARCHAR(255)             NOT NULL,
    body       TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

create table if not exists subscription
(
    sid           UUID                          NOT NULL,
    email         TEXT                          NOT NULL,
    nid           INTEGER REFERENCES newsletter NOT NULL,
    first_name    VARCHAR(100),
    gender        genders,
    date_of_birth DATE DEFAULT NOW(),
    consent_flag  BOOL                          NOT NULL,

    PRIMARY KEY (email, nid)
);

CREATE UNIQUE INDEX subscription_sid_unique_idx ON subscription (sid);
