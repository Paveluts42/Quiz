import React from "react";
import classes from "./AnswersList.module.css"
import AnswerItem from "./answerItem/AnswerItem";

const AnswersList = (props) => (
    <ul className={classes.AnswersList}>
        {props.answers.map((answer, id) => {
            return <AnswerItem
                answer={answer}
                key={id}
                onAnswerClick={props.onAnswerClick}
                state={props.state ? props.state[answer.id] : null}
            />

        })}
    </ul>
)
export default AnswersList