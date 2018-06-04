import { h, FunctionalComponent } from "preact";

import { IHomieDeviceConfig } from "../../../utils/HomieDevice";
import { Text } from "../../../components/ui";
// import { Grid, Row, Column } from "../../../components/ui/grid";


interface IProps {
  homieConfig: IHomieDeviceConfig;
}

const HomieInfo: FunctionalComponent<IProps> = (props: IProps) => {
  const { homieConfig } = props;
  return (
    <div class="background-dark">
      <Text text="Device Info" size="medium" />
      <div>{JSON.stringify(homieConfig)}</div>
    </div>
  );
};

export default HomieInfo;
