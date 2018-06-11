import { h } from "preact";
import { bind } from "decko";
import { connect } from "unistore/preact";

import { TStore } from "../../store";
import { PageComponent, IPageProps } from "../../utils/PageComponent";
import { HomieDevice, IHomieData } from "../../utils/HomieDevice";
import { Button } from "../../components/ui";
import HomieConfig from "./components/HomieConfig";


interface IProps extends IPageProps {
  store: TStore;
  homieData: IHomieData;
}
interface IState { }

class DeviceConfigPage extends PageComponent<IProps, IState> {
  homieDevice: HomieDevice;
  constructor(props: IProps) {
    super(props, "Your Device's Current Config");
    this.homieDevice = new HomieDevice(props.homieData);
  }

  @bind
  getDeviceConfig() {
    this.homieDevice.getDeviceConfig()
      .then(() => this.forceUpdate());
  }

  @bind
  disableNextButton() {
    return !this.homieDevice.hasDeviceConfig;
  }

  renderPage() {
    return (
      <div>
        <Button text="Load Device Config" onClick={this.getDeviceConfig} disable={!this.homieDevice.hasDeviceInfo} />
        {this.homieDevice.hasDeviceConfig &&
          <HomieConfig homieConfig={this.homieDevice.deviceConfig} />
        }
      </div>
    );
  }

  render() {
    this.homieDevice.update(this.props.homieData);
    return super.render();
  }
}

export default connect(["homieData"])(DeviceConfigPage);
