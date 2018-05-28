import { h, FunctionalComponent } from "preact";

interface IProps {
  text: string;
  onClick: () => void;
  class?: string;
}

const Button: FunctionalComponent<IProps> = (props: IProps) => {
  return (
    <button class={props.class} onClick={this.onClick}>{props.text}</button>
  );
};

Button.defaultProps = {
  class: "button block-mobile"
};

export default Button;
