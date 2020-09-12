import axios from "axios";

const apiURL = "http://localhost:3333";

const login = (username, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiURL}/token`, { username, password })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data.token);
        } else {
          reject(response.data.error);
        }
      })
      .catch((err) => reject(err));
  });
};

const getDevs = (token, page, search) => {
  return new Promise((resolve, reject) => {
    const query = `?page=${page}&${search ? "search=" + search : ""}`;
    axios
      .get(`${apiURL}/developers${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data.error);
        }
      })
      .catch((err) => reject(err));
  });
};

const deleteDev = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${apiURL}/developers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data.error);
        }
      })
      .catch((err) => reject(err));
  });
};

const updateDev = (token, id, dev) => {
  return new Promise((resolve, reject) => {
    delete dev._id;
    axios
      .put(`${apiURL}/developers/${id}`, dev, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data.error);
        }
      })
      .catch((err) => reject(err));
  });
};

const insertDev = (token, dev) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${apiURL}/developers`, dev, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data.error);
        }
      })
      .catch((err) => reject(err));
  });
};

export default { login, getDevs, updateDev, deleteDev, insertDev, apiURL };
