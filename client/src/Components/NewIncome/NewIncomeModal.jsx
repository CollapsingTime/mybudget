import React, { useState } from "react";
import Select from "react-select/creatable";
import { Wrapper, H5, ButtonContainer, TextArea } from "./NewIncomeModalStyle";
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

export const GeneralCategories = [
  { value: "Зарплата", label: "Зарплата" },
  { value: "Аванс", label: "Аванс" },
  { value: "Отпускные", label: "Отпускные" },
  { value: "Разное", label: "Разное" }
];

const Categories = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(undefined);
  const [category, setCategory] = useState([]);

  async function onSubmitForm(e) {
    e.preventDefault();
    try {
      const body = { description, amount, category };
      const response = await fetch("/api/dashboard/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          jwtToken: localStorage.token,
        },
        body: JSON.stringify(body),
      });

      console.log(response);
      toast.success("Новый доход успешно добавлен!");
      window.location.reload();
    } catch (err) {
      toast.error(err.message);
      console.error(err.message);
    }
  }

  return (
    <Wrapper onSubmit={onSubmitForm}>
      <H5>Выберите категорию</H5>
      <Select
        onChange={(e) => setCategory(e.value)}
        options={GeneralCategories}
        className="basic-multi-select"
        placeholder="Выбрать"
        classNamePrefix="select"
        styles={colourStyles}
      />
      <H5>Описание</H5>
      <TextArea
        placeholder="Описание"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <H5>Сумма</H5>
      <ItemForm
        position="column"
        required
        type="number"
        min="0.01"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <ButtonContainer>
        <Button>Добавить</Button>
      </ButtonContainer>
    </Wrapper>
  );
};

export default Categories;
