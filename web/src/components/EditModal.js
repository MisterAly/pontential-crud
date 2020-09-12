import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const EditModal = ({
  className,
  value,
  title,
  onClick,
  onConfirm,
  id,
  dev = {},
  ...rest
}) => {
  const [nome, setNome] = useState();
  const [idade, setIdade] = useState();
  const [hobby, setHobby] = useState();

  useEffect(() => {
    setNome(dev.nome);
    setIdade(dev.idade);
    setHobby(dev.hobby);
  }, [dev]);
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
          height: "410px",
          maxWidth: '600px'
        },
      }}
      // shouldCloseOnOverlayClick={false}
    >
      <h2>Altere as informações do desenvolvedor</h2>
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
          <div class="age-container">
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
            onClick={(e) =>
              onConfirm(e, { ...dev, nome, idade: parseInt(idade), hobby })
            }
          >
            Confirmar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
