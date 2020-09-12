import React from 'react';
import Modal from "react-modal";

const DeleteModal = ({ className, value, title, onClick, onConfirm, id, dev, ...rest }) => {

  return (
    <Modal
        isOpen={value}
        onRequestClose={() => onClick}
        style={{
          overlay: {
            backgroundColor: "grey",
          },
          content: {
            height: '153px',
            width: '360px',
            margin: '0 auto'
          }
        }}
        // shouldCloseOnOverlayClick={false}
      >
        <h2>Tem certeza que deseja deletar o desenvolvedor?</h2>
        <div className="buttons-container">
          <button
            className="button button-close"
            onClick={() => onClick(false)}
          >
            Sair
          </button>
          <button
            className="button button-confirm"
            onClick={() => onConfirm(dev.id)}
          >
            Confirmar
          </button>
        </div>
      </Modal>
  )
}

export default DeleteModal