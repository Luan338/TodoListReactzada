import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
  }

  body{
    background-color: blueviolet;
  }

  ul,ol{
    list-style: none;
  }

  input{
    padding: 0.8rem;
    outline: none;
    border: none;
    width: 60%;
  }
  button{
    padding: 0.8rem;
    border: none;
    background-color: rgb(101, 1, 141);
    cursor: pointer;
    color: white;
  }
  h1{
    text-align: center;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
  }
`;

export const Tarefa = styled.div`
  display: flex;
  justify-content: center;
`;

export const List = styled.ul`
  max-width: 300px;
  padding: 0.5rem;
  background: white;
  width: 100%;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background: rgb(163, 0, 1);
  }
`;

export default class App extends Component {
  state = {
    tarefa: "",
    listaTarefas: []
  };

  handleChange = (event) => {
    this.setState({
      tarefa: event.target.value
    });
  };

  addKey = (event) => {
    if (
      this.state.tarefa.length > 0 &&
      event.key === "Enter" &&
      !this.state.tarefa.match(/^[ \t]+$/)
    )
      this.setState({
        listaTarefas: this.state.listaTarefas.concat({
          tarefa: this.state.tarefa,
          id: Date.now()
        }),
        tarefa: ""
      });
  };

  add = () => {
    if (this.state.tarefa.length && !this.state.tarefa.match(/^[ \t]+$/))
      this.setState({
        listaTarefas: this.state.listaTarefas.concat({
          tarefa: this.state.tarefa,
          id: Date.now()
        }),
        tarefa: ""
      });
  };

  remove = (id) => {
    this.setState({
      listaTarefas: this.state.listaTarefas.filter((item) => {
        return item.id !== id;
      })
    });
  };

  render() {
    return (
      <>
        <GlobalStyle />
        <h1>Lista de Tarefas</h1>
        <Tarefa>
          <input
            onChange={this.handleChange}
            value={this.state.tarefa}
            onKeyPress={this.addKey}
          />
          <button onClick={this.add}>Adicionar</button>
        </Tarefa>
        {this.state.listaTarefas.map((item, index) => {
          return (
            <List key={index}>
              <li>{item.tarefa}</li>
              <button onClick={() => this.remove(item.id)}>
                Apagar tarefa
              </button>
            </List>
          );
        })}
      </>
    );
  }
}
