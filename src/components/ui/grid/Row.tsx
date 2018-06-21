import { h, FunctionalComponent, RenderableProps } from "preact";
import { Alignment, convertAlignmentsToClasses } from "./util";


interface IProps {
  alignments?: Alignment;
  class?: string;
}

const Row: FunctionalComponent<IProps> = (props: RenderableProps<IProps>) => {
  const classes = convertAlignmentsToClasses(props.alignments);
  return (
    <div class={`row ${classes} ${props.class}`}>
      {props.children}
    </div>
  );
};

export default Row;
