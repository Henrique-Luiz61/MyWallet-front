import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setName } = useContext(AuthContext);

  const navigate = useNavigate();

  function signIn(e) {
    e.preventDefault();

    const newLogin = {
      email: email,
      password: password,
    };

    const URL = "http://localhost:5000";

    const promise = axios.post(import.meta.env.VITE_API_URL, newLogin);

    promise.then((res) => {
      const { token, userName } = res.data;
      setToken(token);
      setName(userName);
      localStorage.setItem("user", JSON.stringify({ token, userName }));

      navigate("/home");
    });
    promise.catch((err) => {
      console.log("ERRO: ", err.response);
      alert(err.response.data);
    });
  }

  return (
    <SingInContainer>
      <form onSubmit={signIn}>
        <MyWalletLogo />
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
        <button data-test="sign-in-submit" type="submit">
          Entrar
        </button>
      </form>

      <Link to={"/cadastro"}>Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
