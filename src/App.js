import React from "react";
import "./styles.css";
import Trivia from "./containers/Trivia/Trivia";
import NewQuestion from "./containers/NewQuestion/NewQuestion";
import Menu from "./components/Menu/Menu";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container-fluid">
          <Switch>
            <Route path="/play" component={Trivia} />
            <Route path="/new-question" component={NewQuestion} />
            <Route path="/" component={Menu} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
