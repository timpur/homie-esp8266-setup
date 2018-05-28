import { h } from "preact";
import { bind } from "decko";
import { connect } from "unistore/preact";

import { TStore } from "../store";
import { PageComponent, IPageProps } from "../utils/PageComponent";
import HomieDevice, { IHomieData } from "../utils/HomieDevice";
import { Button, BadgeLable, Loading } from "../components/ui";


interface IProps extends IPageProps {
  store: TStore;
  homieData: IHomieData;
}

interface IState {
}

class IntroPage extends PageComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props, "Intro Page");
  }

  @bind
  componentDidMount() {
    const homieDevice = HomieDevice(this.props.homieData);
    homieDevice.findDevice()
      .then(() => this.forceUpdate());
  }

  @bind
  getDeviceInfo() {
    const homieDevice = HomieDevice(this.props.homieData);
    homieDevice.getInfo()
      .then(() => this.forceUpdate());
  }

  renderPage() {
    const homieDevice = HomieDevice(this.props.homieData);
    return (
      <div>
        <Loading enable={false} />
        <BadgeLable lable="Lable" value="value" />
        <BadgeLable lable="Lable" value="value" />
        <p>Intro Page Content</p>
        <p>Device Status: {homieDevice.status ? "Online" : "Offline"}</p>
        <Button text="Load Device Info" onClick={this.getDeviceInfo} />
        <p>Device Id: {homieDevice.info.hardware_device_id}</p>
      </div>
    );
  }
}

export default connect(["homieData"])(IntroPage);