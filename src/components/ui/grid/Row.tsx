import { h, FunctionalComponent, RenderableProps } from "preact";

import { SCREEN_SIZE, ALIGNMENT } from "./constants";

type Alignment = { [K in ALIGNMENT]?: SCREEN_SIZE };

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


function convertAlignmentsToClasses(alignments: Alignment) {
  if (alignments) {
    return Object.keys(alignments)
      .map((alignment: ALIGNMENT) => {
        const size = alignments[alignment];
        return `${alignment}-${size}`;
      })
      .join(" ");
  }
  return "";
}