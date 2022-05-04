import React , {Component} from "react";
import Feed from "./components/Feed/Feed";
import "./index.css";
import ReactDOM,{render} from 'react-dom';


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

