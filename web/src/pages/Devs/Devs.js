import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import  api from '../../services/api';

import convertDate from '../../utils/convertDate';

import './styles.css'

export default function Devs({ history }) {
  const [devs, setDevs ] = useState([]);

  const token = localStorage.getItem('Gazin:token');

  useEffect(() => {
    axios.get(`${api.apiURL}/developers`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.status === 200) {
          setDevs(response.data.items)
        } else {
          history.push('login')
        }
      })
      .catch(err => {
        console.log("Não autorizado")
        history.push('login')
      })
  }, [])

  async function handleNewIncident(e) {
    e.preventDefault();

  }

  return(
    <div className="devs-container">
      <div className="devs-cards-container">
        {devs.map((dev) => (
          <div className="dev-card">
            <div className="header">
              <div className="dev-name">{dev.nome}</div>
            </div>
            <div className="dev-body">
              <div className="hobby">
                <p>{dev.hobby}</p>
              </div>
              <div className="hobby">
                <p>{dev.idade}</p>
                <p>{dev.sexo}</p>
                <p>{convertDate(dev.datanascimento)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}