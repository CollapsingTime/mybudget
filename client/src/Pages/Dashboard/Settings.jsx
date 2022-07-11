import React, { useState, useEffect } from "react";
import { Button } from "../../Components/Button/Button";
import styled from "styled-components";
import { ArchiveContainer, H3, H5, Input, H4 } from "./DashBoardStyle";
import { device } from "../mediaQueries";

import { toast } from "react-toastify";

export const Wrapper = styled.div``;
export const Container = styled.form`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
`;

export const ButtonContainer = styled.div`
  display: none;
  @media ${device.laptop} {
    display: block;
  }
`;

export const HR = styled.hr`
  background: #faeaea;
  width: 200px;
  border: none;
  height: 1px;
`;

export const EmailContainer = styled.span`
  color: blue;
`;

function Settings({ logout }) {
  document.title = "Dashboard - Settings";
  const [nameConst, setNameConst] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userNewPassword, setUserNewPassword] = useState("");

  async function getUserData() {
    try {
      const res = await fetch("/api/dashboard/user", {
        method: "GET",
        headers: { jwtToken: localStorage.token },
      });

      const parseData = await res.json();

      setUserEmail(parseData[0].user_email);
      setUserName(parseData[0].user_name);
      setNameConst(parseData[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  async function onSubmitForm(e) {
    e.preventDefault();
    try {
      const body = { userEmail, userName, userPassword, userNewPassword };
      const response = await fetch("/api/dashboard/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          jwtToken: localStorage.token,
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      console.log(parseRes);

      if (parseRes === "User updated succesfully!") {
        toast.success(parseRes);
        logout(e);
      } else {
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
      toast.error(err.message);
    }
  }

  return (
    <ArchiveContainer onSubmit={onSubmitForm}>
      <Container>
        <H3>Настройки аккаунта</H3>
        <H5>
          В сети как <EmailContainer>{nameConst}</EmailContainer>
        </H5>
        <ButtonContainer>
          {" "}
          <Button onClick={(e) => logout(e)}>Выйти</Button>
        </ButtonContainer>
        <HR />
        <H4>Изменение пароля</H4>
        <Input
          position="column"
          placeholder="Старый пароль"
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <Input
          position="column"
          placeholder="Новый пароль"
          type="password"
          value={userNewPassword}
          onChange={(e) => setUserNewPassword(e.target.value)}
        />
        <HR />
        <H4>Изменить имя или почту</H4>

        <Input
          position="column"
          placeholder="Почта"
          type="text"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <Input
          position="column"
          placeholder="Имя"
          type="name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <HR />
        <Button>Сохранить изменения</Button>
      </Container>
    </ArchiveContainer>
  );
}

export default Settings;
