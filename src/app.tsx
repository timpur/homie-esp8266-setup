import { h, Component } from "preact";

import IntroPage from "./pages/IntroPage";
import * as homieESPImage from "./assets/images/homie-esp8266.png";

interface IProps { }
interface IState { }

export default class App extends Component<IProps, IState> {
  render() {
    return (
      <div>
        <div class="section background-dark">
          <div class="container text-center">
            <h3 class="text-huge text-white text-with-subtitle">Homie for ESP8266</h3>
            <h4 class="text-big text-gray">Set up your device.</h4>
            <img src={homieESPImage} alt="" />
          </div>
        </div>
        <main class="container">
          <div class="section row center-sm">
            <div class="col-xs col-sm-6 center-sm">
              <IntroPage />
            </div>
          </div>
        </main>
      </div>
    );
  }
}
