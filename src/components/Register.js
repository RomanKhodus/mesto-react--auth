import React from "react";
import SigningForm from "./SigningForm";

function Register({ onRegistration, register, isLoading }) {
  const [email, setEmail] = React.useState("");
  // const [buttonText, setButtonText] = React.useState("Зарегистрироваться");

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = React.useState("");
  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };

  function onRegister(e) {
    e.preventDefault();
    // setButtonText("...Регистрирую");
    onRegistration();
    register(email, password);
  }

  return (
    <SigningForm
      title="Регистрация"
      disabled={isLoading}
      buttonText={isLoading ? "..Регистрирую" : "Зарегистрироваться"}
      onSubmit={onRegister}
    >
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
