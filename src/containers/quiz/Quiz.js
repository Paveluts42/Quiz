import React, { Component } from 'react';
import classes from "./Quiz.module.css"
import ActiveQuiz from '../../components/activeQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/finishedQuiz/FinishedQuiz';
import axios from "../../axios/axios-quiz"
import Loader from "../../components/ui/loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById} from "../../store/actions/Quiz";
class Quiz extends Component {

    onAnswerClickHandler = answerId => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === "success") {
                return
            }
        }
        const question = this.state.quiz[this.state.activeQuistion]
        debugger
        const results = this.state.results
        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = "success"
            }
            this.setState({
                answerState: { [answerId]: "success" },
                results
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
            results[question.id] = "error"
            this.setState({
                answerState: { [answerId]: "error" },
                results
            })
        }

    }
    isQuizFinished() {
        return this.state.activeQuistion + 1 === this.state.quiz.length
    }
    retryHandler = () => {
        this.setState({
            activeQuistion: 0,
            answerState: null,
            isFinished: false,
            results: {},

        })
    }
componentDidMount() {
    console.log(this.props.match.params.id)
this.props.fetchQuizById(this.props.match.params.id)
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.props.loading||!this.props.quiz
                            ?<Loader/>
                            :
                            this.props.isFinished ? <FinishedQuiz
                                    onRetry={this.retryHandler}
                                    results={this.props.results}
                                    quiz={this.props.quiz}
                                />
                                :
                                <ActiveQuiz
                                    answers={this.props.quiz[this.props.activeQuistion].answers}
                                    question={this.props.quiz[this.props.activeQuistion].question}
                                    onAnswerClick={this.onAnswerClickHandler}
                                    quizLength={this.props.quiz.length}
                                    answerNumber={this.props.activeQuistion + 1}
                                    state={this.props.answerState}
                                />
                    }
                </div>
            </div >
        )
    }
}
function mapStateToProps(state){
    return{
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuistion: state.quiz.activeQuistion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading,
    }
}
function mapDispatchToProps(dispatch) {
return{
    fetchQuizById:id=>dispatch(fetchQuizById(id))

}
}
export default connect(mapStateToProps,mapDispatchToProps)(Quiz)