import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Overview from "./Overview";
import Nav from "./Navbar";
import Archive from "./Archive";
import TableIncome from "./TableIncome";
import GoalsTable from "./GoalsTable";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Wrapper, MainContainer } from "./DashBoardStyle";
import Expenses from "./Expenses";
import Income from "./Income";
import Goals from "./Goals";
import Settings from "./Settings.jsx";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
  document.title = "Dashboard";

  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [goals, setGoals] = useState([]);

  async function getProfile() {
    try {
      const res = await fetch("/api/dashboard/", {
        method: "GET",
        headers: { jwtToken: localStorage.token },
      });

      const parseData = await res.json();

      setName(parseData[0].user_name);
      setCurrency(parseData[0].user_currency);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getExpenses() {
    try {
      const res = await fetch("/api/dashboard/expenses", {
        method: "GET",
        headers: { jwtToken: localStorage.token },
      });

      const parseData = await res.json();

      setExpenses(parseData);
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getIncomes() {
    try {
      const res = await fetch("/api/dashboard/incomes", {
        method: "GET",
        headers: { jwtToken: localStorage.token },
      });

      const parseData = await res.json();

      setIncomes(parseData);
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getGoals() {
    try {
      const res = await fetch("/api/dashboard/goals", {
        method: "GET",
        headers: { jwtToken: localStorage.token },
      });

      const parseData = await res.json();

      setGoals(parseData);
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getProfile();
    getExpenses();
    getIncomes();
    getGoals();
  }, []);

  async function logout(e) {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error(err.message);
      console.error(err.message);
    }
  }

  return (
    <>
      <Wrapper>
        {isLoading === true ? null : (
          <BrowserRouter>
            <Nav expenses={expenses} incomes={incomes} goals={goals} name={name} />
            <Sidebar logout={logout} />
              <>
                <MainContainer>
                  <Switch>
                    <Route path="/dashboard/overview" exact>
                      <Overview expenses={expenses} currency={currency} />
                    </Route>

                    <Route path="/dashboard/goalstable" exact>
                      <GoalsTable goals={goals} currency={currency}/>
                    </Route>

                    <Route path="/dashboard/goals" exact>
                      <Goals goals={goals} currency={currency}/>
                    </Route>

                    <Route path="/dashboard/archive" exact>
                      <Archive
                        expenses={expenses}
                        currency={currency}
                        setExpenses={setExpenses}
                      />
                    </Route>

                    <Route path="/dashboard/expenses" exact>
                      <Expenses expenses={expenses} currency={currency} />
                    </Route>

                    <Route path="/dashboard/income" exact>
                      <Income incomes={incomes} currency={currency}/>
                    </Route>

                    <Route path="/dashboard/tableincome" exact>
                      <TableIncome incomes={incomes} currency={currency}/>
                    </Route>

                    <Route path="/dashboard/settings" exact>
                      <Settings logout={logout} />
                    </Route>

                    <Route path="/" exact></Route>
                  </Switch>
                </MainContainer>
              </>
          </BrowserRouter>
        )}
      </Wrapper>
    </>
  );
};

export default Dashboard;
