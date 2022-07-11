import React, { useState } from "react";
import {
  Wrapper,
  Form,
  Heading,
  TextContainer,
  SelectContainer,
} from "./AuthStyle";
import { StyledLink } from "../../Components/Button/ButtonStyle";
import { PrimaryOutlineButton } from "../../Components/Button/Button.jsx";
import ItemForm from "../../Components/MainPage/ItemForm.jsx";
import Select from "react-select";
import { InputLabel } from "../../Components/MainPage/ItemForm.jsx";
import { colourStyles } from "../../Components/NewExpenseModal/NewExpenseModal";
import { toast } from "react-toastify";

export const CurrencyList = [
  { label: "GBP", value: "£" },
  { label: "CAD", value: "$" },
  { label: "EUR", value: "€" },
  { label: "RUB", value: "₽" },
  { label: "USD", value: "$" },
];

const SignUp = ({ setAuth }) => {
  document.title = "MyBudget: Register";

  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [currency, setCurrency] = useState("");
  const { email, name, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, name, password, currency };
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Registered successfully!");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Wrapper>
      <Heading>Создание аккаунта MyBudget</Heading>
      <Form onSubmit={onSubmitForm}>
        <ItemForm
          maxLength="12"
          label="Имя"
          position="column"
          type="text"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
        <SelectContainer>
          <InputLabel>Валюта</InputLabel>
          <Select
            styles={colourStyles}
            onChange={(e) => setCurrency(e.value)}
            options={CurrencyList}
            className="basic-multi-select"
            placeholder="Выбрать..."
            classNamePrefix="Select..."
            required
          />
        </SelectContainer>
        <ItemForm
          maxLength="25"
          position="column"
          type="email"
          name="email"
          label="Почта"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <ItemForm
          position="column"
          type="password"
          name="password"
          label="Пароль"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <PrimaryOutlineButton style={{ margin: "auto" }}>
          Зарегистрироваться
        </PrimaryOutlineButton>
        <TextContainer>
          Уже есть аккаунт?
          <StyledLink style={{ color: "#635BFF" }} to="/signin">
            Войти
          </StyledLink>
        </TextContainer>
      </Form>
    </Wrapper>
  );
};

export default SignUp;
