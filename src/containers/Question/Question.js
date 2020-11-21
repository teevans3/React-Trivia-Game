import React, { Component } from "react";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Question.module.css";

class Question extends Component {
  state = {
    success: null,
    currentQuestion: "",
    currentAnswerChoices: [],
    loading: true,
    clickedAnswer: null
  };

  componentDidMount() {
    this.onRandomizer(this.props.questions);
  }

  onRandomizer = (questionsList) => {
    if (this.props.category === "Random") {
      var randomQuestion =
        questionsList[Math.floor(Math.random() * questionsList.length)];
    } else {
      // filter out questions based on category type
      var categQuestions = [];
      for (var i = 0; i < questionsList.length; i++) {
        if (questionsList[i].questionCategory === this.props.category) {
          categQuestions.push(questionsList[i]);
        }
      }
      if (categQuestions.length < 1) {
        this.setState({
          loading: false
        });
        return;
      }
      // retrieve random question that matches the category
      var randomQuestion =
        categQuestions[Math.floor(Math.random() * categQuestions.length)];
    }
    // alter answerChoices holder: from dictionary to list of dictionaries:
    // used to be {correct: "___", wrong: "___", etc.}...
    // now: [{correct: "___"}, {wrong: "___"}, etc.]
    const updatedChoices = [];
    var choices = Object.keys(randomQuestion.answerChoices);
    for (var i = 0; i < choices.length; i++) {
      let newChoice = {};
      newChoice[choices[i]] = randomQuestion.answerChoices[choices[i]];
      updatedChoices.push(newChoice);
    }

    // shuffle answer choices
    const shuffledAnswers = this.onShuffleAnswers(updatedChoices);
    this.setState({
      currentQuestion: randomQuestion.question,
      currentAnswerChoices: shuffledAnswers,
      loading: false
    });
  };

  onShuffleAnswers(answers) {
    var i = answers.length;
    while (--i) {
      var j = Math.floor(Math.random() * (i + 1)); // j = 11
      var tempi = answers[i];
      var tempj = answers[j];
      answers[i] = tempj;
      answers[j] = tempi;
    }
    return answers;
  }

  onAnswerQuestion = (answerChoice, index) => {
    if (answerChoice[0] === "correct") {
      this.setState({ success: true, clickedAnswer: index });
    } else {
      this.setState({ success: false, clickedAnswer: index });
    }
  };

  onNextQuestion = (questionsList) => {
    this.setState(
      {
        success: null,
        clickedAnswer: null
      },
      () => this.onRandomizer(questionsList)
    );
  };

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    if (this.state.currentQuestion === "") {
      return <div>There are currently no questions in this category.</div>;
    }

    const answerChoices = this.state.currentAnswerChoices.map(
      (choice, index) => {
        let answerType = Object.keys(choice);
        let answerClicked = null;
        // Display correct/incorrect if answered and disable hover
        if (this.state.clickedAnswer !== null) {
          if (this.state.clickedAnswer === index) {
            if (this.state.success) {
              answerClicked = " bg-success";
            } else {
              answerClicked = " bg-danger";
            }
          }
        }
        // Only allow user to answer once; if user has already answered, disable onclick event
        return (
          <div
            className={
              classes.AnswerChoice + " col-8 rounded-pill " + answerClicked
            }
            key={index}
            onClick={
              this.state.success === null
                ? () => this.onAnswerQuestion(answerType, index)
                : null
            }
          >
            <span>{choice[answerType]}</span>
          </div>
        );
      }
    );

    // Display skip/next button
    let nextButton = "Skip";
    if (this.state.success !== null) {
      nextButton = "Next";
    }
    return (
      <div>
        <div className={classes.Question}>{this.state.currentQuestion}</div>
        <div>{answerChoices}</div>
        <div
          className={classes.NextBtn + " col-1 rounded-pill"}
          onClick={() => this.onNextQuestion(this.props.questions)}
        >
          <span>{nextButton}</span>
        </div>
      </div>
    );
  }
}

export default Question;
