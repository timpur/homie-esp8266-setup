import { h, FunctionalComponent } from "preact";

import { Colour, Style } from "./constants";

interface IProps {
  lable: string;
  value: string;
  lableColour?: Colour | Style;
  valueColour?: Colour | Style;
}

const BadgeLable: FunctionalComponent<IProps> = (props: IProps) => {
  return (
    <ul class="badges-list badge-lable">
      <li class={`badges-list-item badge-${props.lableColour}`}>{props.lable}</li>
      <li class={`badges-list-item badge-${props.valueColour}`}>{props.value}</li>
    </ul>
  );
};

BadgeLable.defaultProps = {
  lableColour: "default",
  valueColour: "primary"
};

export default BadgeLable;
