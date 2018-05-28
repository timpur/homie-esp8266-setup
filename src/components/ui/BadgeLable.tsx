import { h, FunctionalComponent } from "preact";

interface IProps {
  lable: string;
  value: string;
  lableColour?: string;
  valueColour?: string;
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
  lableColour: "primary",
  valueColour: "secondary"
};

export default BadgeLable;
