CREATE DATABASE budget;

CREATE TABLE users(
  user_id INTEGER,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_currency VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE income(
  income_id INTEGER,
  income_amount NUMERIC NOT NULL,
  income_description VARCHAR(255) NOT NULL,
  income_category VARCHAR(255) NOT NULL,
  income_date timestamptz NOT NULL DEFAULT now(),
  user_id UUID,
  PRIMARY KEY (income_id)
);

CREATE TABLE expenses(
  expense_id INTEGER,
  expense_amount NUMERIC NOT NULL,
  expense_description VARCHAR(255) NOT NULL,
  expense_category VARCHAR(255) NOT NULL,
  expense_date timestamptz NOT NULL DEFAULT now(),
  user_id UUID,
  PRIMARY KEY (expense_id) 
);

CREATE TABLE goal(
  goal_id INTEGER,
  goal_amount NUMERIC NOT NULL,
  goal_now NUMERIC NOT NULL,
  goal_description VARCHAR(255) NOT NULL,
  goal_category VARCHAR(255) NOT NULL,
  goal_date timestamptz NOT NULL DEFAULT now(),
  goal_date_stop timestamptz NOT NULL,
  user_id UUID,
  PRIMARY KEY (goal_id)  
);