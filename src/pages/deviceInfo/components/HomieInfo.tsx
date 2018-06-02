import { h, FunctionalComponent } from "preact";

import { IHomieDeviceInfo } from "../../../utils/HomieDevice";
import { BadgeLable, Text } from "../../../components/ui";
import { Grid, Row, Column } from "../../../components/ui/grid";


interface IProps {
  homieInfo: IHomieDeviceInfo;
}

const HomieInfo: FunctionalComponent<IProps> = (props: IProps) => {
  const { homieInfo } = props;
  return (
    <div class="background-dark">
      <Text text="Device Info" size="big" />
      <Grid>
        <Row alignments={{ center: "xs", around: "xs" }}>
          <Column columns={{ xs: "6" }}>
            <BadgeLable lable="Hardware ID" value={homieInfo.hardware_device_id} />
            <BadgeLable lable="Homie ESP8266 Version" value={homieInfo.homie_esp8266_version} />
          </Column>
          <Column columns={{ xs: "6" }}>
            <BadgeLable lable="Homie Version" value={homieInfo.homie_version} />
            <BadgeLable lable="Configuration State" value={homieInfo.device_config_state ? "Okay" : "Error"} />
          </Column>
        </Row>
        <Row>
          <Column>
            <Text text="Nodes" size="big" />
            {homieInfo.nodes.map(node => {
              return (
                <BadgeLable lable={node.id} value={node.type} />
              );
            })}
          </Column>
          <Column>
            <Text text="Settings" size="big" />
            {homieInfo.settings.map(setting => {
              return (
                <BadgeLable lable={`${setting.name} (${setting.description})`} value={setting.type} />
              );
            })}
          </Column>
        </Row>
      </Grid>
    </div>
  );
};

export default HomieInfo;
