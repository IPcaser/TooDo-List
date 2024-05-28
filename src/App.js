import './App.css';
import Header from './Mycompu/Header';
import { Todos } from './Mycompu/Todos';
import { TodoItem } from './Mycompu/TodoItem';
import { Footer } from './Mycompu/Footer';
import React, { useState, useEffect } from 'react';
import { AddTodo } from './Mycompu/AddTodo';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Switch
} from "react-router-dom";
import { About } from './Mycompu/About';

function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) => {
    console.log("I am delete", todo)

    setTodos(todos.filter((e) => {
      return e !== todo;
    }))
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const addTodo = (title, desc) => {
    console.log("I am adding a todo", title, desc);
    let srno;
    if (todos.length == 0) {
      srno = 0;
    }
    else {
      srno = todos[todos.length - 1].srno + 1;
    }

    const myTodo = {
      srno: srno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo)
  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <>
      <Router>
        <Header title="My Todos List" searchBar={true} />

        <Routes>
        {/* <Route exact path="/" render = {() => {
            return (
              <>
                <AddTodo addTodo={addTodo} />
                <Todos todos={todos} onDelete={onDelete} />
              </>
            )
          }} element={<AddTodo addTodo={addTodo} />
        } /> */}
          <Route exact path="/" render = {() => {
            return (
              <>
                <AddTodo addTodo={addTodo} />
                <Todos todos={todos} onDelete={onDelete} />
              </>
            )
          }} element={<><AddTodo addTodo={addTodo}/><Todos todos={todos} onDelete={onDelete}/></>} />
          <Route exact path="/about" element={<About/>}/>
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
