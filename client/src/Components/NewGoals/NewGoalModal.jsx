import React, { useState } from "react";
import { Wrapper, H5, ButtonContainer, TextArea } from "./NewGoalModalStyle";
import { Button } from "../Button/Button";
import ItemForm from "../MainPage/ItemForm";

import { toast } from "react-toastify";

export const colourStyles = {
  control: (base) => ({
    ...base,
    border: "none",
    boxShadow: "rgba(3, 102, 214, 0.1) 0px 0px 0px 1px",
    transition: "all 0.3s ease-out",
    "&:hover": {
      boxShadow: "rgba(88, 101, 242, .7) + 0px 0px 0px 3px",
    },
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = "aqua";
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color
        : undefined,
      color: isDisabled ? "#ccc" : isSelected,

      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "rgb(248,250,253)",
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "aqua",
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: "#5865F2",
    ":hover": {
      backgroundColor: "rgba(88, 101, 242, .7)",
      color: "white",
    },
  }),
};

const Categories = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(undefined);
  const [now, setNow] = useState(undefined);
  const [date_stop, setDateStop] = useState(undefined);
  const [category, setCategory] = useState([]);

  async function onSubmitForm(e) {
    e.preventDefault();
    try {
      const body = { category, description, amount, now, date_stop };
      const response = await fetch("/api/dashboard/goal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          jwtToken: localStorage.token,
        },
        body: JSON.stringify(body),
      });

      console.log(response);
      toast.success("Цель добавлена!");
      window.location.reload();
    } catch (err) {
      toast.error(err.message);
      console.error(err.message);
    }
  }

  return (
    <Wrapper onSubmit={onSubmitForm}>
      <H5>Название цели</H5>
      <TextArea
        onChange={(e) => setCategory(e.target.value)}
        type="text"
        className="basic-multi-select"
        placeholder="Цель..."
        styles={colourStyles}
      />
      <H5>Описание</H5>
      <TextArea
        placeholder="Описание"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <H5>Итоговая сумма</H5>
      <ItemForm
        position="column"
        required
        type="number"
        min="0.01"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <H5>Сейчас</H5>
      <ItemForm
        position="column"
        required
        type="number"
        min="0.01"
        step="0.01"
        value={now}
        onChange={(e) => setNow(e.target.value)}
      />

      <H5>Дата завершения</H5>
      <ItemForm
        position="column"
        required
        type="date"
        min="0.01"
        step="0.01"
        value={date_stop}
        onChange={(e) => setDateStop(e.target.value)}
      />
      <ButtonContainer>
        <Button>Добавить</Button>
      </ButtonContainer>
    </Wrapper>
  );
};

export default Categories;
