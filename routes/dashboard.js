const router = require("express").Router();
const bcrypt = require("bcrypt");
const authorize = require("../middleware/authorize");
const pool = require("../db");

router.get("/", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name, user_currency, user_email FROM users WHERE user_id = $1",
      [req.user.id]
    );
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/expense", authorize, async (req, res) => {
  try {
    console.log(req.body);

    const { amount, description, category } = req.body;

    const newExpense = await pool.query(
      "INSERT INTO expenses (user_id, expense_amount, expense_description, expense_category) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.user.id, amount, description, category]
    );

    console.log(newExpense.rows[0]);
    res.json(newExpense.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/expense", authorize, async (req, res) => {
  try {
    console.log(req.body);
    const {
      expense_id,
      expense_amount,
      expense_description,
      expense_category,
    } = req.body;

    const updateExpense = await pool.query(
      "UPDATE expenses SET expense_amount = $1, expense_description=$2, expense_category=$3 WHERE expense_id = $4 AND user_id = $5 RETURNING *",
      [
        expense_amount,
        expense_description,
        expense_category,
        expense_id,
        req.user.id,
      ]
    );

    res.json(`Expense with ID ${expense_id} was updated`);
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/expense/:expense_id", authorize, async (req, res) => {
  try {
    console.log(req.body);
    const { expense_id } = req.params;
    const deleteExpense = await pool.query(
      "DELETE FROM expenses WHERE expense_id = $1 AND user_id = $2 RETURNING *",
      [expense_id, req.user.id]
    );

    console.log(`req.user.id = ${req.user.id}`);
    console.log(`deleteExpense = ${deleteExpense}`);
    res.json(`Expense ${expense_id} was deleted`);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/expenses", authorize, async (req, res) => {
  try {
    const expenses = await pool.query(
      "SELECT * FROM expenses WHERE user_id = $1 ORDER BY expense_date USING <",
      [req.user.id]
    );

    res.json(expenses.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/income", authorize, async (req, res) => {
  try {
    console.log(req.body);

    const { amount, description, category } = req.body;

    const newIncome = await pool.query(
      "INSERT INTO income (user_id, income_amount, income_description, income_category) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.user.id, amount, description, category]
    );

    console.log(newIncome.rows[0]);
    res.json(newIncome.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/income", authorize, async (req, res) => {
  try {
    console.log(req.body);
    const {
      income_id,
      income_amount,
      income_description,
      income_category,
    } = req.body;

    const updateIncome = await pool.query(
      "UPDATE income SET income_amount = $1, income_description=$2, income_category=$3 WHERE income_id = $4 AND user_id = $5 RETURNING *",
      [
        income_amount,
        income_description,
        income_category,
        income_id,
        req.user.id,
      ]
    );

    res.json(`Income with ID ${income_id} was updated`);
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/income/:income_id", authorize, async (req, res) => {
  try {
    console.log(req.body);
    const { income_id } = req.params;
    const deleteIncome = await pool.query(
      "DELETE FROM income WHERE income_id = $1 AND user_id = $2 RETURNING *",
      [income_id, req.user.id]
    );

    console.log(`req.user.id = ${req.user.id}`);
    console.log(`deleteIncome = ${deleteIncome}`);
    res.json(`Income ${income_id} was deleted`);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/incomes", authorize, async (req, res) => {
  try {
    const incomes = await pool.query(
      "SELECT * FROM income WHERE user_id = $1 ORDER BY income_date USING <",
      [req.user.id]
    );

    res.json(incomes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/goal", authorize, async (req, res) => {
  try {
    console.log(req.body);

    const { amount, now, description, category, date_stop } = req.body;

    const newGoal = await pool.query(
      "INSERT INTO goal (user_id, goal_amount, goal_now, goal_description, goal_category, goal_date_stop) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [req.user.id, amount, now, description, category, date_stop]
    );

    console.log(newGoal.rows[0]);
    res.json(newGoal.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/goal", authorize, async (req, res) => {
  try {
    console.log(req.body);
    const {
      goal_id,
      goal_amount,
      goal_now,
      goal_description,
      goal_category,
      goal_date_stop
    } = req.body;

    const updateGoal = await pool.query(
      "UPDATE goal SET goal_amount = $1, goal_now=$2, goal_description=$3, goal_category=$4, goal_date_stop=$5 WHERE goal_id = $6 AND user_id = $7 RETURNING *",
      [
        goal_amount,
        goal_now,
        goal_description,
        goal_category,
        goal_date_stop,
        goal_id,
        req.user.id,
      ]
    );

    res.json(`Goal with ID ${goal_id} was updated`);
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/goal/:goal_id", authorize, async (req, res) => {
  try {
    console.log(req.body);
    const { goal_id } = req.params;
    const deleteGoal = await pool.query(
      "DELETE FROM goal WHERE goal_id = $1 AND user_id = $2 RETURNING *",
      [goal_id, req.user.id]
    );

    console.log(`req.user.id = ${req.user.id}`);
    console.log(`deleteGoal = ${deleteGoal}`);
    res.json(`Goal ${goal_id} was deleted`);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/goals", authorize, async (req, res) => {
  try {
    const goals = await pool.query(
      "SELECT * FROM goal WHERE user_id = $1 ORDER BY goal_date USING <",
      [req.user.id]
    );

    res.json(goals.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/user", authorize, async (req, res) => {
  try {
    const userData = await pool.query(
      "SELECT user_name, user_email FROM users WHERE user_id = $1",
      [req.user.id]
    );

    res.json(userData.rows);
  } catch (err) {
    console.error(err.mesage);
  }
});

router.put("/user", authorize, async (req, res) => {
  try {
    console.log(req.body);
    const { userName, userEmail, userPassword, userNewPassword } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      req.user.id,
    ]);

    const validPassword = await bcrypt.compare(
      userPassword,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credentials!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(userNewPassword, salt);

    const updateUser = await pool.query(
      "UPDATE users SET user_name=$1, user_email=$2, user_password=$3 WHERE user_id=$4  RETURNING *",
      [userName, userEmail, bcryptPassword, req.user.id]
    );

    return res.json("User updated succesfully!");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;