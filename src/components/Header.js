import logoWhite from "../images/logo-white.svg";
import { Route, Switch, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";

function Header({ email, handleEmailchange }) {
  const history = useHistory();

  function onSignOut() {
    history.push("/signin");
    localStorage.removeItem("jwt");
    handleEmailchange("");
  }

  return (
    <header className="header">
      <img src={logoWhite} alt="Логотип сайта" className="header__logo" />
      <div className="header__container">
        <Switch>
          <Route exact path="/signin">
            <Link to="/signup" className="header__link">
              Зарегистрироваться
            </Link>
          </Route>

          <Route exact path="/signup">
            <Link to="/signin" className="header__link">
              Войти
            </Link>
          </Route>

          <Route path="/">
            <div className="header__email">{email}</div>
            <Link to="/signin" className="header__link" onClick={onSignOut}>
              Выход
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
