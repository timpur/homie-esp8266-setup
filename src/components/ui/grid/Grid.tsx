import { h, FunctionalComponent, RenderableProps } from "preact";


interface IProps {
  class?: string;
}

const Grid: FunctionalComponent<IProps> = (props: RenderableProps<IProps>) => {
  return (
    <div class={`grid ${props.class}`}>
      {props.children}
    </div>
  );
};

export default Grid;