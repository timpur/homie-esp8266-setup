import { h, FunctionalComponent } from "preact";

import { BadgeColour, BadgeSize } from "../constants";

type Item = {
  value: string,
  colour?: BadgeColour,
  size?: BadgeSize
} | string;

interface IProps {
  items: Array<Item>;
}

const Badge: FunctionalComponent<IProps> = (props: IProps) => {
  const items = parseItems(props.items);
  return (
    <ul class="badges-list badge-joined">
      {items.map((item) => (<li class={`badges-list-item badge-${item.colour}`}>{item.value}</li>))}
    </ul>
  );
};

export default Badge;


function parseItems(items: Array<Item>) {
  return items.map((item, index) => {
    if (typeof item === "string") item = { value: item, colour: getDefaultColour(index) };
    if (item.colour === undefined) item.colour = getDefaultColour(index);
    return item;
  });
}

function getDefaultColour(index: number): BadgeColour {
  switch (index) {
    case 0: return "default";
    case 1: return "primary";
    default: return "secondary";
  }
}
