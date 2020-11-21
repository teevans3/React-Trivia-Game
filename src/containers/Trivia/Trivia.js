import React, { Component } from "react";
import axios from "axios";
import Categories from "../../components/Categories/Categories";
import Question from "../Question/Question";
import BackToMenu from "../../components/BackToMenu/BackToMenu";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Trivia.module.css";

class Trivia extends Component {
  state = {
    category: "",
    questions: [],
    categories: [],
    loading: true
  };

  async componentDidMount() {
    // const questionsList = [];
    const questionsList = await axios.get(
      "https://trivia-game-faeb7.firebaseio.com/questions.json"
    );
    const categoriesList = await axios.get(
      "https://trivia-game-faeb7.firebaseio.com/categories.json"
    );

    this.setState({
      categories: Object.values(categoriesList.data),
      questions: Object.values(questionsList.data),
      loading: false
    });
  }

  onCategoryChange = (categ) => {
    this.setState({ category: categ });
  };

  render() {
    // Spinner for while data is being retrieved
    if (this.state.loading) {
      return <Spinner />;
    }

    // Display categories if not yet selected
    if (this.state.category === "") {
      return (
        <div>
          <div className={classes.Trivia + " " + classes.Categories}>
            <Categories
              categories={this.state.categories}
              changeCateg={this.onCategoryChange}
            />
          </div>
          <BackToMenu />
        </div>
      );
    }

    return (
      <div>
        <h2>{this.state.category}</h2>
        <div className={classes.Trivia}>
          <Question
            category={this.state.category}
            questions={this.state.questions}
          />
        </div>
        <BackToMenu />
      </div>
    );
  }
}

export default Trivia;
