import { h, FunctionalComponent, RenderableProps } from "preact";

import { SCREEN_SIZE, COLUMN_SIZE } from "./constants";


type Column = { [K in SCREEN_SIZE]?: COLUMN_SIZE };

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

function convertColumnsToClasses(columns: Column) {
  if (columns) {
    return Object.keys(columns)
      .map((screen: SCREEN_SIZE) => {
        const column = columns[screen];
        if (column === "auto") return `col-${screen}`;
        return `col-${screen}-${column}`;
      })
      .join(" ");
  }
  return "";
}
