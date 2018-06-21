import { h, Component } from "preact";
import { bind } from "decko";
import { connect } from "unistore/preact";

import { IStoreState } from "./store";
import { Tab, TabItem } from "./components/ui/tab";
// import * as homieESPImage from "./assets/images/homie-esp8266.png";

import IntroPage from "./pages/introPage/IntroPage";
import DeviceInfoPage from "./pages/deviceInfoPage/DeviceInfoPage";
import DeviceConfig from "./pages/deviceConfigPage/DeviceConfigPage";
import WifiSettingsPage from "./pages/WifiSettingsPage/WifiSettingsPage";


interface IProps {
  activeTabID: string;
  setActiveTab: (tabID: string) => void;
}
interface IState { }

class App extends Component<IProps, IState> {
  tab: Tab;

  componentDidMount() {
    const tabID = this.tab.defaultTab();
    this.props.setActiveTab(tabID);
  }

  @bind
  onBack() {
    console.log("back");
    const tabID = this.tab.previousTab();
    this.props.setActiveTab(tabID);
  }
  @bind
  onNext() {
    console.log("next");
    const tabID = this.tab.nextTab();
    this.props.setActiveTab(tabID);

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
        <main class="grid container">
          <div class="section row center-sm">
            <div class="column col-xs-12 col-sm-10 col-md-8 center-xs">
              <div class="content">
                <Tab activeTabID={this.props.activeTabID} onTabClick={this.props.setActiveTab} ref={(tab) => this.tab = tab}>
                  <TabItem id="intro_page" title="Intro Page">
                    <IntroPage onBack={this.onBack} onNext={this.onNext} />
                  </TabItem>
                  <TabItem id="device_info" title="Device Info">
                    <DeviceInfoPage onBack={this.onBack} onNext={this.onNext} />
                  </TabItem>
                  <TabItem id="device_config" title="Device Config">
                    <DeviceConfig onBack={this.onBack} onNext={this.onNext} />
                  </TabItem>
                  <TabItem id="wifi_settings" title="Wifi Settings">
                    <WifiSettingsPage onBack={this.onBack} onNext={this.onNext} />
                  </TabItem>
                  <TabItem id="mqtt_settings" title="MQTT Settings">
                  </TabItem>
                  <TabItem id="device_settings" title="Device Settings">
                  </TabItem>
                </Tab>
              </div>
            </div>
          </div>
        </main>
      </div >
    );
  }
}

const mapActionsToProps = {
  setActiveTab: (state: IStoreState, tabID: string) => {
    return {
      ...state,
      activeTabID: tabID
    };
  }
};

export default connect(["activeTabID"], mapActionsToProps)(App);
