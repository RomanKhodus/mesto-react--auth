import { API_CONFIG } from "./constants";

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    // this.credential = options.credential;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // credential: this.credential,
    }).then(res => this._checkResponse(res));
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  setUserInfo(user) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  setNewCard(cardData) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
      }).then((res) => {
        return this._checkResponse(res);
      });
    } else {
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
      }).then((res) => {
        return this._checkResponse(res);
      });
    }
  }

  setAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
      body: JSON.stringify({ avatar: link }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

const api = new Api(API_CONFIG);

export default api;
