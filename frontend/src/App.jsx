import {Routes, Route, BrowserRouter as Router} from "react-router-dom";
import Home from "./views/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App