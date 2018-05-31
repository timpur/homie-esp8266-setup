import { h, FunctionalComponent } from "preact";

type TextSize = "small" | "medium" | "big" | "huge";

interface IProps {
  text: string;
  size?: TextSize;
}

const Text: FunctionalComponent<IProps> = (props: IProps) => {
  const classes = `${props.size ? `text-${props.size}` : null}`;
  return (
    <p class={classes}>{props.text}</p>
  );
};

export default Text;