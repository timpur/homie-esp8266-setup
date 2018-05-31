import { h, FunctionalComponent } from "preact";

interface IProps {
  text: string;
  onClick: () => void;
  class?: string;
  disable?: boolean;
}

const Button: FunctionalComponent<IProps> = (props: IProps) => {
  return (
    <button
      class={`${props.class} ${props.disable ? "button-disabled" : null}`}
      onClick={props.onClick}
      disabled={props.disable}>
      {props.text}
    </button>
  );
};

Button.defaultProps = {
  class: "button block-mobile",
  disable: false
};

export default Button;
