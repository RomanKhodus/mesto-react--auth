import React from "react";
import { useHistory } from "react-router-dom";
import SigningForm from "./SigningForm";
import * as Auth from "./Auth.js";

function Register({ onRegistration, isSuccess }) {
  const history = useHistory();

  const [email, setEmail] = React.useState("");
  const [buttonText, setButtonText] = React.useState("Зарегистрироваться");

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = React.useState("");
  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };

  function onRegister(e) {
    e.preventDefault();
    setButtonText("...Регистрирую");
    onRegistration();
    Auth.register(email, password)
      .then((res) => {
        if (res) {
          isSuccess(true);
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        isSuccess(false);
        console.log(`Ошибка: ${err.status}`);
      })
      .finally(() => setButtonText("Зарегистрироваться"));
  }

  return (
    <SigningForm title="Регистрация" buttonText={buttonText} onSubmit={onRegister}>
      <input
        type="email"
        // id="avatar-link-input"
        className="signing__input"
        name="email"
        onChange={handleSetEmail}
        value={email}
        // ref={avatarRef}
        placeholder="Email"
        required
      />
      <input
        type="password"
        // id="avatar-link-input"
        className="signing__input"
        value={password}
        name="password"
        onChange={handleSetPassword}
        // ref={avatarRef}
        placeholder="Пароль"
        required
      />
    </SigningForm>
  );
}

export default Register;
