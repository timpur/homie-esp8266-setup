import { h, FunctionalComponent, VNode } from "preact";

import Badge from "./Badge";

interface IProps {
  children: Array<VNode>;
  label?: string;
}
const BadgeList: FunctionalComponent<IProps> = (props: IProps) => {
  return (
    <div class="badge-list">
      {props.label ? <Badge items={[props.label]} /> : null}
      <ul>
        {props.children.map((child) => (
          <li>{child}</li>
        ))}
      </ul>
    </div>
  );
};

export default BadgeList;
