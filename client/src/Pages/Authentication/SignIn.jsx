import React, { useState } from "react";
import { PrimaryOutlineButton } from "../../Components/Button/Button.jsx";
import { StyledLink } from "../../Components/Button/ButtonStyle.jsx";
import ItemForm from "../../Components/MainPage/ItemForm.jsx";
import { Wrapper, Heading, Form, TextContainer } from "./AuthStyle";
import { toast } from "react-toastify";
const SignIn = ({ setAuth }) => {
  document.title = "MyBudget: Sign In";
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("/api/auth/login", {
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
        toast.success("Logged in successfully!");
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
      <Heading>Войти в аккаунт</Heading>
      <Form onSubmit={onSubmitForm}>
        <ItemForm
          position="column"
          label="Почта"
          type="email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <ItemForm
          position="column"
          label="Пароль"
          type="password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <PrimaryOutlineButton style={{ margin: "auto" }}>
          Войти
        </PrimaryOutlineButton>
        <TextContainer>
          Еще нет аккаутна?
          <StyledLink style={{ color: "#635BFF" }} to="/signup">
            Регистрация
          </StyledLink>
        </TextContainer>
      </Form>
    </Wrapper>
  );
};

export default SignIn;
