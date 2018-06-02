import { h, Component } from "preact";
import { bind } from "decko";

import { Tab, TabItem } from "./components/ui/tab";
// import * as homieESPImage frowm "./assets/images/homie-esp8266.png";

import IntroPage from "./pages/introPage/IntroPage";
import DeviceInfo from "./pages/deviceInfo/DeviceInfo";


interface IProps { }
interface IState { }

export default class App extends Component<IProps, IState> {
  tab: Tab;

  @bind
  onBack() {
    console.log("back");
    this.tab.previousTab();
  }
  @bind
  onNext() {
    console.log("next");
    this.tab.nextTab();
  }

  render() {
    return (
      <div>
        <div class="section background-dark">
          <div class="container text-center">
            <h3 class="text-huge text-white text-with-subtitle">Homie for ESP8266</h3>
            <h4 class="text-big text-gray">Set up your device.</h4>
            {/* <img src={homieESPImage} alt="" /> */}
          </div>
        </div>
        <main class="container">
          <div class="section row center-sm">
            <div class="col-xs-12 col-sm-10 col-md-8 center-xs">
              <Tab ref={(tab) => this.tab = tab}>
                <TabItem id="1" title="Intro Page">
                  <IntroPage onBack={this.onBack} onNext={this.onNext} />
                </TabItem>
                <TabItem id="2" title="Device Info">
                  <DeviceInfo onBack={this.onBack} onNext={this.onNext} />
                </TabItem>
              </Tab>
            </div>
          </div>
        </main>
      </div >
    );
  }
}
