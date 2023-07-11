import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import axios from "axios";

export default function TransactionsPage() {
  const { tipo } = useParams();
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  function saveTransaction(e) {
    e.preventDefault();

    const newTransaction = {
      descricao: descricao,
      valor: valor,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.post(
      `${import.meta.env.VITE_API_URL}/nova-transacao/${tipo}`,
      newTransaction,
      config
    );

    promise.then((res) => {
      navigate("/home");
    });
    promise.catch((err) => {
      alert(err.response.data);
    });
  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={saveTransaction}>
        <input
          placeholder="Valor"
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
          data-test="registry-amount-input"
        />
        <input
          placeholder="Descrição"
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          data-test="registry-name-input"
        />
        <button type="submit" data-test="registry-save">
          Salvar {tipo}
        </button>
      </form>
    </TransactionsContainer>
  );
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;
