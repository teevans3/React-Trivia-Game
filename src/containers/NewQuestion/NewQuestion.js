import React, { Component } from "react";
import axios from "axios";
import BackToMenu from "../../components/BackToMenu/BackToMenu";
import classes from "./NewQuestion.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";

class NewQuestion extends Component {
  state = {
    question: "",
    questionCategory: "",
    answerChoices: {
      wrong1: "",
      wrong2: "",
      wrong3: "",
      correct: ""
    },
    categories: [],
    loading: true
  };

  // Retrieve all categories on page load
  componentDidMount() {
    axios
      .get("https://trivia-game-faeb7.firebaseio.com/categories.json")
      .then((response) => {
        this.setState({ categories: response.data, loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log("There was an error with your axios request");
        console.log(error.data);
      });
  }

  onUpdateQuestion = (event) => {
    this.setState({ question: event.target.value });
  };

  onUpdateCategory = (event) => {
    this.setState({ questionCategory: event.target.value });
  };

  onUpdateAnswerChoice = (event, answerChoice) => {
    this.setState((prevState) => ({
      answerChoices: {
        ...prevState.answerChoices,
        [answerChoice]: event.target.value
      }
    }));
  };

  checkQuestionRequirements = (newQuestion) => {
    // Make sure input is not empty
    if (
      newQuestion.question === "" ||
      newQuestion.questionCategory === "" ||
      newQuestion.answerChoices.wrong1 === "" ||
      newQuestion.answerChoices.wrong2 === "" ||
      newQuestion.answerChoices.wrong3 === "" ||
      newQuestion.answerChoices.correct === ""
    ) {
      return { success: false, message: "Please fill out all fields." };
    }
    // Make sure input is not just blank space
    if (
      !newQuestion.question.replace(/\s/g, "").length ||
      !newQuestion.answerChoices.wrong1.replace(/\s/g, "").length ||
      !newQuestion.answerChoices.wrong2.replace(/\s/g, "").length ||
      !newQuestion.answerChoices.wrong3.replace(/\s/g, "").length ||
      !newQuestion.answerChoices.correct.replace(/\s/g, "").length
    ) {
      return {
        success: false,
        message: "Please make sure inputs are not just empty space"
      };
    }
    // Make sure answer choices are all unique
    for (var q in newQuestion.answerChoices) {
      for (var k in newQuestion.answerChoices) {
        if (
          newQuestion.answerChoices[q] === newQuestion.answerChoices[k] &&
          q !== k
        ) {
          return {
            success: false,
            message: "Please make sure all answer choices are unique."
          };
        }
      }
    }
    return { success: true, message: null };
  };

  onSubmitNewQuestion = () => {
    const newQuestion = {
      question: this.state.question,
      questionCategory: this.state.questionCategory,
      answerChoices: {
        wrong1: this.state.answerChoices.wrong1,
        wrong2: this.state.answerChoices.wrong2,
        wrong3: this.state.answerChoices.wrong3,
        correct: this.state.answerChoices.correct
      }
    };

    // create a separate check function (lots of checks to do);
    if (!this.checkQuestionRequirements(newQuestion).success) {
      alert(this.checkQuestionRequirements(newQuestion).message);
      return;
    }

    axios
      .post(
        "https://trivia-game-faeb7.firebaseio.com/questions.json",
        newQuestion
      )
      .then((response) => {
        console.log("question submitted!");
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }

    const categoriesList = this.state.categories.map((categ) => {
      if (categ === "Random") {
        return;
      }
      return (
        <option value={categ} key={categ}>
          {categ}
        </option>
      );
    });
    const answerTypes = ["wrong1", "wrong2", "wrong3", "correct"];
    const answerInputs = answerTypes.map((answerType) => {
      let placeholder = "Incorrect Answer";
      if (answerType === "correct") {
        placeholder = "Correct Answer";
      }
      return (
        <input
          className={classes.NewAnswer + " col-8 rounded-pill"}
          onChange={(event) => this.onUpdateAnswerChoice(event, answerType)}
          type="text"
          placeholder={placeholder}
          name={answerType}
          key={answerType}
        />
      );
    });
    return (
      <div className={classes.NewQuestionContainer}>
        <h2>Add a new question:</h2>
        <textarea
          className={classes.NewQuestion + " col-10"}
          type="text"
          placeholder="Question"
          onChange={(event) => this.onUpdateQuestion(event)}
        ></textarea>
        <div className={classes.NewAnswersDiv}>{answerInputs}</div>
        <div className={classes.SubmitDiv + " col-8"}>
          <select
            className={classes.CategSelect + " col-8 rounded-pill"}
            onChange={(event) => this.onUpdateCategory(event)}
          >
            <option
              value={null}
              disabled
              selected
              style={{ color: "#c0c0c0 !important" }}
            >
              Categories
            </option>
            {categoriesList}
          </select>
          <button
            className={classes.SubmitBtn + " col-3 rounded-pill"}
            onClick={this.onSubmitNewQuestion}
            type="submit"
          >
            Submit
          </button>
        </div>
        <BackToMenu />
      </div>
    );
  }
}

export default NewQuestion;
