import axios from "axios"

export default axios.create(
    {
       baseURL:"https://react-quiz-a2653.firebaseio.com"
    }
)