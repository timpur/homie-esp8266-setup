import { h, FunctionalComponent } from "preact";

import { IHomieDeviceInfo } from "../../../utils/HomieDevice";
import { Text } from "../../../components/ui";
import { Grid, Row, Column } from "../../../components/ui/grid";
import { BadgeLable, BadgeList, Badge } from "../../../components/ui/badge";


interface IProps {
  homieInfo: IHomieDeviceInfo;
}

const HomieInfo: FunctionalComponent<IProps> = (props: IProps) => {
  const { homieInfo } = props;
  return (
    <div class="background-dark padding-2">
      {/* <Text text="Device Info" size="medium" /> */}
      <Grid class="">
        <Row alignments={{ center: "xs", around: "xs" }}>
          <Column>
            <BadgeList>
              <BadgeLable lable="Hardware ID" value={homieInfo.hardware_device_id} />
              <BadgeLable lable="Homie Version" value={homieInfo.homie_version} />
              <BadgeLable lable="Homie ESP8266 Version" value={homieInfo.homie_esp8266_version} />
              <BadgeLable lable="Configuration State" value={homieInfo.device_config_state ? "Okay" : "Error"} />
              <BadgeList label="Firmware">
                <BadgeLable lable="Name" value={homieInfo.firmware.name} />
                <BadgeLable lable="Version" value={homieInfo.firmware.version} />
              </BadgeList>
            </BadgeList>
          </Column>
        </Row>
        <Row>
          <Column>
            <Text text="Nodes" size="medium" />
            {homieInfo.nodes.map(node => {
              return (
                <BadgeLable lable={node.id} value={node.type} />
              );
            })}
          </Column>
          <Column>
            <Text text="Settings" size="medium" />
            {homieInfo.settings.map(setting => {
              return (
                <Badge items={[
                  setting.name,
                  setting.description,
                  setting.type
                ]}
                />
              );
            })}
          </Column>
        </Row>
      </Grid>
    </div>
  );
};

export default HomieInfo;
