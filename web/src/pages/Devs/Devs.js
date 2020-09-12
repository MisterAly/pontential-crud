import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import convertDate from "../../utils/convertDate";
import DeleteModal from "../../components/DeleteModal";
import EditModal from "../../components/EditModal";
import AddModal from "../../components/AddModal";

import api from "../../services/api";

import "./styles.css";

export default function Devs({ history }) {
  const [devs, setDevs] = useState([]);
  const [dev, setDev] = useState();
  const [page, setPage] = useState(1);
  const token = localStorage.getItem("Gazin:token");
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [addIsOpen, setAddIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    api
      .getDevs(token, page, search)
      .then((data) => {
        setTotal(data.total)
        setDevs(data.items);
      })
      .catch((err) => {
        console.log(err);
        console.log("Não autorizado");
        history.push("login");
      });

    setLoading(false);
  }, [loading, search, page]);

  function deleteDev(id) {
    api
      .deleteDev(token, id)
      .then(() => {
        setDeleteIsOpen(false);
        console.log(id, " deleted");
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
        console.log("Não autorizado");
        history.push("login");
      });
  }

  function editDev(e, dev) {
    e.preventDefault();
    api
      .updateDev(token, dev._id, dev)
      .then(() => {
        setEditIsOpen(false);
        console.log(dev.nome, "updated");
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
        console.log("Não autorizado");
        history.push("login");
      });
  }

  function addDev(e, dev) {
    e.preventDefault();
    api
      .insertDev(token, dev)
      .then(() => {
        setAddIsOpen(false);
        console.log(dev.nome, "inserted");
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
        console.log("Não autorizado");
        history.push("login");
      });
  }

  return (
    <div className="devs-container">
      <header className="header-container">
        <div className="search-input">
          <input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Busca"
          ></input>
          <FaSearch size={20} />
        </div>
        <button
          className="button add-button"
          onClick={async () => {
            setAddIsOpen(true);
          }}
        >
          <FaPlus size={20} />Adicionar desenvolvedor
        </button>
      </header>
      {devs.length > 0 ? <div>
      <div className="body-container">
        {page>1?<div
          className="arrow-box"
          onClick={() => {
            if (page > 1) setPage(page - 1);
          }}
        >
          <FaChevronLeft size={25} />
        </div>:<div className="arrow-box-empty"></div>}
        <section className="devs-list">
          {devs.map((dev) => (
            <article className="dev-card" key={dev._id}>
              <header className="dev-header">
                <h2>{dev.nome}</h2>
                <div>
                  <FaEdit
                    size={25}
                    className="edit-icon"
                    onClick={async () => {
                      await setDev(dev);
                      setEditIsOpen(true);
                    }}
                  />
                  <FaTrash
                    size={25}
                    className="delete-icon"
                    onClick={async () => {
                      await setDev({ id: dev._id });
                      setDeleteIsOpen(true);
                    }}
                  />
                </div>
              </header>
              <div className="dev-body">
                <p>
                  <b>Idade:</b> {dev.idade}
                </p>
                <p>
                  <b>Sexo:</b> {dev.sexo}
                </p>
                <p>
                  <b>Data de Nascimento:</b>{" "}
                  {convertDate.ddMMyyyy(dev.datanascimento)}
                </p>
                <div className="dev-hobby-box">
                  <p>{dev.hobby}</p>
                </div>
              </div>
            </article>
          ))}
        </section>
        { page*4 < total ?<div
          className="arrow-box"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          <FaChevronRight size={25} />
        </div>:<div className="arrow-box-empty"></div>}   
        
      </div>
      <div className="page">{page}</div>
      </div>:<p className="empty-msg">Nenhum dev encontrado.</p>}
      

      <AddModal
        value={addIsOpen}
        onClick={setAddIsOpen}
        dev={dev}
        onConfirm={addDev}
      />
      <EditModal
        value={editIsOpen}
        onClick={setEditIsOpen}
        dev={dev}
        onConfirm={editDev}
      />
      <DeleteModal
        value={deleteIsOpen}
        onClick={setDeleteIsOpen}
        dev={dev}
        onConfirm={deleteDev}
      />
    </div>
  );
}
