import React, { useState } from "react";
import "./styles.css";

import jwt_decode from "jwt-decode";

import api from "../../services/api";

import logoImg from "../../assets/logo-gazin.png";

export default function Login({ history }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    api
      .login(usuario, senha)
      .then((jwtToken) => {
        const user = jwt_decode(jwtToken);
        window.localStorage.setItem("Gazin:token", jwtToken);

        history.push("/devs");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="login-container">
      <section className="form">
        <form onSubmit={handleLogin}>
          <img src={logoImg} alt="Gazin" />

          <h1>Login</h1>

          <input
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Usuário"
          />
          <input
            value={senha}
            type="password"
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
          />
          <button className="button" type="submit">
            Entrar
          </button>
        </form>
      </section>
    </div>
  );
}
