import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";
import axios from "axios";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPass] = useState("");

  const navigate = useNavigate();

  function signUp(e) {
    e.preventDefault();

    const newUser = {
      name: name,
      email: email,
      password: password,
    };

    const promise = axios.post(
      `${import.meta.env.VITE_API_URL}/cadastro`,
      newUser
    );

    if (password === confirmPassword) {
      promise.then((res) => {
        navigate("/");
      });
      promise.catch((err) => {
        alert(err.response.data);
      });
    } else {
      alert("Senhas diferentes!");
    }
  }

  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input
          data-test="name"
          placeholder="Nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          data-test="email"
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          data-test="password"
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          data-test="conf-password"
          placeholder="Confirme a senha"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPass(e.target.value)}
          required
        />
        <button data-test="sign-up-submit" type="submit">
          Cadastrar
        </button>
      </form>

      <Link to={"/"}>Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
