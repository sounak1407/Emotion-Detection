import React , {Component} from "react";
import Feed from "./components/Feed/Feed";
import "./index.css";
import ReactDOM,{render} from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
export default class App extends Component {
  constructor(props) {
    super(props);
  }

   render() {
    return (
      <div >
      <Feed />
    </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);

