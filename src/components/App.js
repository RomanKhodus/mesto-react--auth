import React from "react";
import { Route, Switch, Redirect, withRouter, useHistory } from "react-router-dom";
import Footer from "./Footer.js";
import Header from "./Header.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import api from "../Utils/api.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import * as Auth from "./Auth.js";
import ProtectedRoute from "./ProtectedRoute.js";

function App() {
  const history = useHistory();

  const [email, setEmail] = React.useState("");
  function handleEmailchange(email) {
    setEmail(email);
  }
  const [buttonText, setButtonText] = React.useState("Сохранить");
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(true);
  function handleSetIsSuccess(status) {
    setIsSuccess(status);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  function handleEditProfilePopupOpen() {
    setIsEditProfilePopupOpen(true);
  }
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  function handleAddPlacePopupOpen() {
    setIsAddPlacePopupOpen(true);
  }
  const [selectedCard, setSelectedCard] = React.useState({ name: "", link: "" });
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  const [loggedIn, setLoggedIn] = React.useState(false);
  function handleLogin(state) {
    setLoggedIn(state);
  }

  // Проверка токена
  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        Auth.getContent(jwt).then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
            history.push("/");
          }
        });
      }
    }
  }, [email]);

  // Получение начальных данных
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));

    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => {
          return state.filter((item) => item._id !== card._id);
        });
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  function handleUpdateUser(user) {
    setButtonText("Думаю...");
    api
      .setUserInfo(user)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`))
      .finally(() => {
        setButtonText("Сохранить");
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setButtonText("Думаю...");
    api
      .setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`))
      .finally(() => {
        setButtonText("Сохранить");
      });
  }

  function handleAddPlaceSubmit(cardData) {
    setButtonText("Думаю...");
    api
      .setNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`))
      .finally(() => {
        setButtonText("Сохранить");
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} handleEmailchange={handleEmailchange} />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfilePopupOpen}
            onAddPlace={handleAddPlacePopupOpen}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route exact path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>

          <Route exact path="/sign-up">
            <>
              <Register isSuccess={handleSetIsSuccess} onRegistration={handleInfoTooltipOpen} />
            </>
          </Route>

          <Route exact path="/sign-in">
            <>
              <Login handleLogin={handleLogin} handleEmailchange={handleEmailchange} />
            </>
          </Route>
        </Switch>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={buttonText}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonText={buttonText}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonText={buttonText}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} buttonText={buttonText} />

        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isSuccess={isSuccess} />

        {/* Еще не реализован */}
        <PopupWithForm title="Вы уверены?" name="remove" buttonText="Да"></PopupWithForm>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

