import React from 'react';
import Layout from "./hoc/layout/Layout"
import Quiz from './containers/quiz/Quiz';
import {Route,Switch} from 'react-router-dom'
import Auth from "./containers/auth/Auth";
import QuizList from "./containers/quizList/QuizList";
import QuzeCreator from "./containers/quizCreator/QuzeCreator";

function App() {
  return (
    <Layout>
        <Switch>
        <Route path={"/auth"} component={Auth}/>
        <Route path={"/quiz-creator"} component={QuzeCreator}/>
        <Route path={"/quiz/:id"} component={Quiz}/>
        <Route path={"/"} component={QuizList}/>
</Switch>
    </Layout>
  )
}

export default App;
