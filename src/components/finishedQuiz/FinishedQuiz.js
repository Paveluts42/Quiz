import React from "react"
import classes from "./FinishedQuiz.module.css"

const FinishedQuiz = props => {
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                <li>
                    <strong>1. </strong>
                    how are you?
                    <i className={"fa fa-times"} />
                </li>
                <li>
                    <strong>2. </strong>
                    how are you?
                    <i className={"fa fa-check"} />
                </li>
            </ul>
            <p>правильно 4 из 10</p>
            <div>
                <button>again</button>
            </div>
        </div>
    )
}

export default FinishedQuiz