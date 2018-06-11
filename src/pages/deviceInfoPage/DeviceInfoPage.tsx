import { h } from "preact";
import { bind } from "decko";
import { connect } from "unistore/preact";

import { TStore } from "../../store";
import { PageComponent, IPageProps } from "../../utils/PageComponent";
import { HomieDevice, IHomieData } from "../../utils/HomieDevice";
import { Button } from "../../components/ui";
import HomieInfo from "./components/HomieInfo";


interface IProps extends IPageProps {
  store: TStore;
  homieData: IHomieData;
}
interface IState { }

class DeviceInfoPage extends PageComponent<IProps, IState> {
  homieDevice: HomieDevice;
  constructor(props: IProps) {
    super(props, "Your Device's Info");
    this.homieDevice = new HomieDevice(props.homieData);
  }

  @bind
  getDeviceInfo() {
    this.homieDevice.getDeviceInfo()
      .then(() => this.forceUpdate());
  }

  @bind
  disableNextButton() {
    return !this.homieDevice.hasDeviceInfo;
  }

  renderPage() {
    return (
      <div>
        <Button text="Load Device Info" onClick={this.getDeviceInfo} disable={!this.homieDevice.status} />
        {this.homieDevice.hasDeviceInfo &&
          <HomieInfo homieInfo={this.homieDevice.deviceInfo} />
        }
      </div>
    );
  }

  render() {
    this.homieDevice.update(this.props.homieData);
    return super.render();
  }
}

export default connect(["homieData"])(DeviceInfoPage);
