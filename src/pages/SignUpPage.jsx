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
        console.log(res.data);
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
          placeholder="Nome"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          data-test="name"
        />
        <input
          placeholder="E-mail"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-test="email"
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-test="password"
        />
        <input
          placeholder="Confirme a senha"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPass(e.target.value)}
          data-test="conf-password"
        />
        <button type="submit" data-test="sign-up-submit">
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
