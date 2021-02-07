import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Menu from "./components/menu";
import CreateBento from "./components/createBento";
import EditBento from "./components/editBento";
import Register from "./components/register";
import Login from "./components/login";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <div className="container">
        <Route path="/" exact component={Home} />
        <Route path="/menu" component={Menu} />
        <Route path="/create" component={CreateBento} />
        <Route path="/edit/:id" component={EditBento} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
