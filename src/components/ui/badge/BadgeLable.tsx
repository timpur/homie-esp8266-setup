import { h, FunctionalComponent } from "preact";

import { BadgeColour } from "../constants";
import Badge from "./Badge";


interface IProps {
  lable: string;
  value: string;
  lableColour?: BadgeColour;
  valueColour?: BadgeColour;
}

const BadgeLable: FunctionalComponent<IProps> = (props: IProps) => {
  return (
    <Badge items={[
      { value: props.lable, colour: props.lableColour },
      { value: props.value, colour: props.valueColour }
    ]} />
  );
};

BadgeLable.defaultProps = {
  lableColour: "default",
  valueColour: "primary"
};

export default BadgeLable;
