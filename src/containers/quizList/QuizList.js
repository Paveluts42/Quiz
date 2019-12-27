import React,{Component} from "react"
import classes from "./QuizList.module.css"
import {NavLink} from "react-router-dom"
import Loader from "../../components/ui/loader/Loader";
import {connect} from "react-redux";
import axios from "../../axios/axios-quiz";
import {fetchQuizes, fetchQuizesError, fetchQuizesSuccess} from "../../store/actions/Quiz";
class QuizList extends Component{

    renderQuizes(){
        return this.props.quizes.map((quiz)=>{
            return(
                <li
                    key={quiz.id}
                >
<NavLink to={"/quiz/"+quiz.id}>
    {quiz.name}
</NavLink>
                </li>
            )

        })
    }

 componentDidMount() {
        this.props.fetchQuizes()
  //   try {
  //       const response=await axios.get(`/quizes/.json`)
  //       const quizes=[]
  //       Object.keys(response.data).forEach((key,index)=>{
  //           quizes.push({
  //               id:key,
  //               name:`test #${index+1}`}
  //           )
  //       })
  //      this.setState({
  //          quizes,loading:false,
  //      })
  //   }catch (e) {
  // console.log(e)
  //   }
    }

    render() {
        return(
            <div className={classes.OuizList}>
<div>
<h1>Список тестов</h1>
    {this.props.loading&&this.props.quizes.length!==0
    ?<Loader/>
    :
        <ul>
            {this.renderQuizes()}
        </ul>
    }


</div>
            </div>
        )
    }
}
function mapStateToProps(state) {
return{
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
}
}
function mapDispatchToProps(dispatch) {
return{
    fetchQuizes:()=>dispatch(fetchQuizes())
}
}
export default connect(mapStateToProps,mapDispatchToProps)(QuizList)