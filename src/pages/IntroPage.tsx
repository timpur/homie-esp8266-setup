import { h } from "preact";
import { bind } from "decko";
import { connect } from "unistore/preact";

import { TStore } from "../store";
import { PageComponent, IPageProps } from "../utils/PageComponent";
import { HomieDevice, IHomieData } from "../utils/HomieDevice";
import { Button, BadgeLable, Loading, Text } from "../components/ui";
import { Grid, Row, Column } from "../components/ui/grid";


interface IProps extends IPageProps {
  store: TStore;
  homieData: IHomieData;
}

interface IState {
}

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
    this.homieDevice.getInfo()
      .then(() => this.forceUpdate());
  }

  @bind
  disableBackButton() {
    return true;
  }

  @bind
  disableNextButton() {
    return !this.homieDevice.hasDeviceInfo;
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
        <Button text="Load Device Info" onClick={this.getDeviceInfo} disable={!this.homieDevice.status} />
        {this.homieDevice.hasDeviceInfo && ([
          <Text text="Device Info" size="big" />,
          <Grid>
            <Row alignments={{ center: "xs" }}>
              <Column columns={{ xs: "6" }}>
                <BadgeLable lable="Hardware ID" value={this.homieDevice.deviceInfo.hardware_device_id} />
                <BadgeLable lable="Homie ESP8266 Version" value={this.homieDevice.deviceInfo.homie_esp8266_version} />
              </Column>
              <Column columns={{ xs: "6" }}>
                <BadgeLable lable="Homie Version" value={this.homieDevice.deviceInfo.homie_version} />
                <BadgeLable lable="Configuration State" value={this.homieDevice.deviceInfo.device_config_state ? "Okay" : "Error"} />
              </Column>
            </Row>
            <Row>
              <Column>
                <Text text="Nodes" size="big" />
                {this.homieDevice.deviceInfo.nodes.map(node => {
                  return (
                    <BadgeLable lable={node.id} value={node.type} />
                  );
                })}
              </Column>
            </Row>
          </Grid>
        ])}
      </div>
    );
  }
  render() {
    this.homieDevice.update(this.props.homieData);
    return super.render();
  }
}

export default connect(["homieData"])(IntroPage);