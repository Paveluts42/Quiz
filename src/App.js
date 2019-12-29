import React from 'react';
import Layout from "./hoc/layout/Layout"
import Quiz from './containers/quiz/Quiz';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import Auth from "./containers/auth/Auth";
import QuizList from "./containers/quizList/QuizList";
import QuizCreator from "./containers/quizCreator/QuizCreator";
import {connect} from "react-redux";
import Logout from "./components/logout/Logout";
import {autoLogin} from "./store/actions/auth";


class App extends React.Component {
    componentDidMount() {
        this.props.autoLogin()
    }

    render() {
        let routes = (
            <Switch>
                <Route path={"/auth"} component={Auth}/>
                <Route path={"/quiz/:id"} component={Quiz}/>
                <Route path={"/"} exact component={QuizList}/>
                <Redirect to={"/"}/>
            </Switch>

        )
        if (this.props.isAutenticated) {
            routes = (
                <Switch>
                    <Route path={"/quiz-creator"} component={QuizCreator}/>
                    <Route path={"/quiz/:id"} component={Quiz}/>
                    <Route path={"/logout"} component={Logout}/>
                    <Route path={"/"}exact component={QuizList}/>
                    <Redirect to={"/"}/>
                </Switch>
            )
        }
        return (
            <Layout>
                {routes}
            </Layout>)
    }
}

function mapStateToProps(state) {
    return {
        isAutenticated: !!state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
