import { h, FunctionalComponent } from "preact";

import { IHomieDeviceInfo } from "../../../utils/HomieDevice";
import { Text } from "../../../components/ui";
import { Grid, Row, Column } from "../../../components/ui/grid";
import { BadgeLabel, BadgeList, Badge } from "../../../components/ui/badge";


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
              <BadgeLabel label="Hardware ID" value={homieInfo.hardware_device_id} />
              <BadgeLabel label="Homie Version" value={homieInfo.homie_version} />
              <BadgeLabel label="Homie ESP8266 Version" value={homieInfo.homie_esp8266_version} />
              <BadgeLabel label="Configuration State" value={homieInfo.device_config_state ? "Okay" : "Error"} />
              <BadgeList label="Firmware">
                <BadgeLabel label="Name" value={homieInfo.firmware.name} />
                <BadgeLabel label="Version" value={homieInfo.firmware.version} />
              </BadgeList>
            </BadgeList>
          </Column>
        </Row>
        <Row>
          <Column>
            <Text text="Nodes" size="medium" />
            {homieInfo.nodes.map(node => {
              return (
                <BadgeLabel label={node.id} value={node.type} />
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
