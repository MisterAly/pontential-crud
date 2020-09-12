import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import pt from "date-fns/locale/pt";
import "react-datepicker/dist/react-datepicker.css";

import  convertDate  from "../utils/convertDate";

registerLocale("pt", pt);
setDefaultLocale("pt");

const AddModal = ({
  className,
  value,
  title,
  onClick,
  onConfirm,
  id,
  ...rest
}) => {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("");
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [hobby, setHobby] = useState("");

  return (
    <Modal
      isOpen={value}
      onRequestClose={() => onClick}
      style={{
        overlay: {
          backgroundColor: "grey",
        },
        content: {
          margin: "0 auto",
          height: "630px",
          maxWidth: '600px'
        },
      }}
      // shouldCloseOnOverlayClick={false}
    >
      <h2>Adicione o desenvolvedor</h2>
      <form className="dev-form">
        <span className="dev-form-top">
          <div>
            <label>Nome</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Fulano da Silva"
            />
          </div>
          <div className="age-container">
            <label>Idade</label>
            <input
              value={idade}
              onChange={(e) =>
                setIdade(e.target.validity.valid ? e.target.value : idade)
              }
              placeholder="30"
              pattern="[0-9]*"
            />
          </div>
        </span>
        <div className="form-item-container">
          <label>Sexo</label>
          <select
            value={sexo}
            onChange={(e) => {
              setSexo(e.target.value);
            }}
          >
            <option value="" disabled hidden>
              Selecione uma opção
            </option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            <option value="O">Outro</option>
          </select>
        </div>
        <div className="form-item-container">
          <label>Data de nascimento</label>
          <DatePicker
            selected={dataNascimento}
            onChange={(date) => setDataNascimento(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <label>Hobby</label>
        <textarea
          value={hobby}
          onChange={(e) => setHobby(e.target.value)}
          placeholder="Gosto de Ler"
        />
        <div className="buttons-container">
          <button
            className="button button-close"
            onClick={() => onClick(false)}
          >
            Sair
          </button>
          <button
            className="button button-confirm"
            onClick={(e) => {
              if (idade != null && nome !== "" && sexo !== "" && hobby !== "") {
                onConfirm(e, {
                  nome,
                  sexo,
                  idade: parseInt(idade),
                  hobby,
                  datanascimento: convertDate.yyyyMMdd(dataNascimento),
                }
                );
                setNome("");
                setIdade("");
                setHobby("");
                setSexo("");
                setDataNascimento(new Date())
              } else {
                e.preventDefault();
                alert("Preencha todos os campos!");
              }
            }}
          >
            Confirmar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddModal;
