import { h, FunctionalComponent, RenderableProps } from "preact";


interface IProps {

}

const Grid: FunctionalComponent<IProps> = (props: RenderableProps<IProps>) => {
  return (
    <div class="grid">
      {props.children}
    </div>
  );
};

export default Grid;