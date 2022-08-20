import React from "react";
import { useHistory } from "react-router-dom";
import SigningForm from "./SigningForm";
import * as Auth from "./Auth.js";

function Login({ handleLogin, handleEmailchange }) {
  const history = useHistory();

  const [buttonText, setButtonText] = React.useState("Вход");

  const [email, setEmail] = React.useState("");
  const handleSetEmail = (e) => {
    setEmail(e.target.value);
    handleEmailchange(email);
  };
  const [password, setPassword] = React.useState("");
  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };

  function onLogin(e) {
    e.preventDefault();
    setButtonText("...Думаю");
    Auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          handleLogin(true);
          setEmail("");
          setPassword("");
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setButtonText("Войти"));
  }

  return (
    <SigningForm title="Вход" buttonText={buttonText} onSubmit={onLogin}>
      <input
        type="email"
        // id="avatar-link-input"
        className="signing__input"
        name="email"
        value={email}
        onChange={handleSetEmail}
        placeholder="Email"
        required
      />
      <input
        type="password"
        // id="avatar-link-input"
        className="signing__input"
        name="password"
        value={password}
        onChange={handleSetPassword}
        placeholder="Пароль"
        required
      />
    </SigningForm>
  );
}

export default Login;
