import { h } from "preact";
import { bind } from "decko";
import { connect } from "unistore/preact";

import { TStore } from "../../store";
import { PageComponent, IPageProps } from "../../utils/PageComponent";
import { HomieDevice, IHomieData } from "../../utils/HomieDevice";
import { Loading } from "../../components/ui";
import { BadgeLable } from "../../components/ui/badge";


interface IProps extends IPageProps {
  store: TStore;
  homieData: IHomieData;
}
interface IState { }

class IntroPage extends PageComponent<IProps, IState> {
  homieDevice: HomieDevice;
  constructor(props: IProps) {
    super(props, "Lets get you Connected");
    this.homieDevice = new HomieDevice(props.homieData);
  }

  @bind
  componentDidMount() {
    this.homieDevice.findDevice()
      .then(() => this.forceUpdate());
  }

  @bind
  getDeviceInfo() {
    this.homieDevice.getDeviceInfo()
      .then(() => this.forceUpdate());
  }

  @bind
  disableBackButton() {
    return true;
  }

  @bind
  disableNextButton() {
    return !this.homieDevice.status;
  }

  renderPage() {
    return (
      <div>
        <Loading show={!this.homieDevice.status} typeBar />
        <BadgeLable
          lable="Device Status"
          value={this.homieDevice.status ? "Online" : "Offline"}
          valueColour={this.homieDevice.status ? "success" : "error"}
        />
      </div>
    );
  }

  render() {
    this.homieDevice.update(this.props.homieData);
    return super.render();
  }
}

export default connect(["homieData"])(IntroPage);
