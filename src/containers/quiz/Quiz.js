import React, { Component } from 'react';
import classes from "./Quiz.module.css"
import ActiveQuiz from '../../components/activeQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/finishedQuiz/FinishedQuiz';

class Quiz extends Component {
    state = {
        isFinished: true,
        activeQuistion: 0,
        answerState: null,//{[id]:"success"||"error"}
        quiz: [
            {
                question: "Какй цвет неба?",
                rightAnswersId: 4,
                id: 1,
                answers: [
                    { text: "черный", id: 1 },
                    { text: "белый", id: 2 },
                    { text: "зеленый", id: 3 },
                    { text: "синий", id: 4 },
                    { text: "желтый", id: 5 },
                ]
            },
            {
                question: "В каком году был основан Санкт-Петербург?",
                rightAnswersId: 2,
                id: 2,
                answers: [
                    { text: 1801, id: 1 },
                    { text: 1703, id: 2 },
                    { text: 1659, id: 3 },
                    { text: 1699, id: 4 },
                    { text: 1742, id: 5 },
                ]
            }
        ],

    }
    onAnswerClickHandler = answerId => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === "success") {
                return
            }
        }
        const question = this.state.quiz[this.state.activeQuistion]
        if (question.rightAnswersId === answerId) {
            this.setState({
                answerState: { [answerId]: "success" }
            })
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({ isFinished: true })
                } else {
                    this.setState({
                        activeQuistion: this.state.activeQuistion + 1,
                        answerState: null,
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)

        } else {
            this.setState({
                answerState: { [answerId]: "error" }
            })
        }

    }
    isQuizFinished() {
        return this.state.activeQuistion + 1 === this.state.quiz.length
    }
    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.isFinished ? <FinishedQuiz />
                            :
                            <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuistion].answers}
                                question={this.state.quiz[this.state.activeQuistion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuistion + 1}
                                state={this.state.answerState}
                            />
                    }

                </div>
            </div >
        )
    }
}
export default Quiz