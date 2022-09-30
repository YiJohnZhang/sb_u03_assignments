\c sb_35_02_07

DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS industries;
DROP TABLE IF EXISTS companies_industries_join;

CREATE TABLE companies (
    code text PRIMARY KEY NOT NULL,
    name text NOT NULL UNIQUE,
    description text
);

CREATE TABLE invoices (
    id serial PRIMARY KEY,
    comp_code text NOT NULL REFERENCES companies(code) ON DELETE CASCADE,
    amt float NOT NULL,
    paid boolean DEFAULT false NOT NULL,
    add_date date DEFAULT CURRENT_DATE NOT NULL,
    paid_date date,
    CONSTRAINT invoices_amt_check CHECK ((amt > (0)::double precision))
);

CREATE TABLE industries (
    code TEXT PRIMARY KEY,
    industry_field TEXT NOT NULL
);

CREATE TABLE companies_industries_join (
    industries_code TEXT NOT NULL REFERENCES industries(code) ON DELETE CASCADE,
    company_code TEXT NOT NULL REFERENCES companies(code) ON DELETE CASCADE,
    PRIMARY KEY(industries_code, company_code)
);

INSERT INTO companies
    VALUES ('AAPL', 'Apple Computer', 'Maker of OSX.'),
        ('IBM', 'IBM', 'Big blue.');

INSERT INTO invoices (comp_code, amt, paid, paid_date)
    VALUES ('AAPL', 100, false, null),
        ('AAPL', 200, false, null),
        ('AAPL', 300, true, '2018-01-01'),
        ('IBM', 400, false, null);

INSERT INTO industries (code, industry_field)
    VALUES ('conele', 'Consumer Electronics'),
        ('bigdat', 'Big Data'),
        ('teleco', 'Telecommunications');

INSERT INTO companies_industries_join (industries_code, company_code)
    VALUES ('conele', 'AAPL'),
        ('bigdat', 'IBM');