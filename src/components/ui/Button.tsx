import { h, FunctionalComponent } from "preact";
import { ButtonColour, ButtonSize } from "./constants";


interface IProps {
  text: string;
  onClick: () => void;
  colour?: ButtonColour;
  size?: ButtonSize;
  class?: string;
  mobile?: boolean;
  disable?: boolean;
  collapse?: boolean;
}


const Button: FunctionalComponent<IProps> = (props: IProps) => {
  const classes = [
    "button",
    props.class,
    props.colour ? `button-${props.colour}` : null,
    props.size ? `button-${props.size}` : null,
    props.mobile ? "block-mobile" : null,
    props.disable ? "button-disabled" : null,
    props.collapse ? "item" : null
  ]
    .filter(item => !!item)
    .join(" ");
  return (
    <button
      class={classes}
      onClick={props.onClick}
      disabled={props.disable}
      type="button"
    >
      {props.text}
    </button>
  );
};

Button.defaultProps = {
  disable: false,
  colour: "default",
  size: "default"
};

export default Button;
