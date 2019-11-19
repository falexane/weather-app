import React from "react";
import ReactDOM from "react-dom";
import WeatherApp from "./WeatherApp";
import "./styles.css";
import * as serviceWorker from './serviceWorker'

/* function App() {
  return <WeatherApp />;
}
 */
const rootElement = document.getElementById("root");
ReactDOM.render(<WeatherApp />, rootElement);

serviceWorker.register()

