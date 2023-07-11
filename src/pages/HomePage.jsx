import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  const [transacoes, setTransacoes] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const { token, name } = useContext(AuthContext);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(`${import.meta.env.VITE_API_URL}/home`, config);

    promise.then((res) => {
      setTransacoes(res.data.transacoes);
      setTotal(res.data.total);
    });
    promise.catch((err) => {
      if (!token) {
        alert("Faça login!");
      } else {
        alert(err.response.data);
      }
    });
  }, []);

  function logout() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.delete(
      `${import.meta.env.VITE_API_URL}/home`,
      config
    );
    promise.then((res) => {
      console.log(res.data);
      localStorage.clear();
      navigate("/");
    });
    promise.catch((err) => {
      alert(err.response.data);
    });
  }

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {name}</h1>
        <BiExit onClick={logout} data-test="logout" />
      </Header>

      <TransactionsContainer>
        <ul>
          {transacoes.map((tra, i) => (
            <ListItemContainer key={i}>
              <div>
                <span>{tra.data}</span>
                <strong data-test="registry-name">{tra.descricao}</strong>
              </div>
              <Value
                color={tra.tipo === "entrada" ? "positivo" : "negativo"}
                data-test="registry-amount"
              >
                {tra.valor}
              </Value>
            </ListItemContainer>
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value
            color={total > 0 ? "positivo" : "negativo"}
            data-test="total-amount"
          >
            {total.toFixed(2)}
          </Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>
        <button data-test="new-income">
          <Link to={"/nova-transacao/entrada"}>
            <AiOutlinePlusCircle />
            <p>
              Nova <br /> entrada
            </p>
          </Link>
        </button>

        <button data-test="new-expense">
          <Link to={"/nova-transacao/saida"}>
            <AiOutlineMinusCircle />
            <p>
              Nova <br />
              saída
            </p>
          </Link>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`;
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`;
