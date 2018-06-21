
import { SCREEN_SIZE, ALIGNMENT, COLUMN_SIZE } from "./constants";

export type Alignment = { [K in ALIGNMENT]?: SCREEN_SIZE };
export type Column = { [K in SCREEN_SIZE]?: COLUMN_SIZE };


export function convertAlignmentsToClasses(alignments: Alignment) {
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

export function convertColumnsToClasses(columns: Column) {
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
