import { h, FunctionalComponent, RenderableProps } from "preact";
import { Column, convertColumnsToClasses } from "./util";


interface IProps {
  columns?: Column;
  class?: string;
}

const Column: FunctionalComponent<IProps> = (props: RenderableProps<IProps>) => {
  const classes = convertColumnsToClasses(props.columns);
  return (
    <div class={`column ${classes} ${props.class}`} >
      <div class="content">
        {props.children}
      </div>
    </div >
  );
};

Column.defaultProps = {
  columns: {
    xs: "auto"
  }
};

export default Column;
