import { h, FunctionalComponent } from "preact";

import { BadgeColour } from "../constants";
import Badge from "./Badge";


interface IProps {
  label: string;
  value: string;
  labelColour?: BadgeColour;
  valueColour?: BadgeColour;
}

const BadgeLabel: FunctionalComponent<IProps> = (props: IProps) => {
  return (
    <Badge items={[
      { value: props.label, colour: props.labelColour },
      { value: props.value, colour: props.valueColour }
    ]} />
  );
};

BadgeLabel.defaultProps = {
  labelColour: "default",
  valueColour: "primary"
};

export default BadgeLabel;
