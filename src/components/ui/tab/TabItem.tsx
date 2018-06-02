import { h, FunctionalComponent, RenderableProps } from "preact";


export interface IProps {
  id: string;
  title: string;
}

const TabItem: FunctionalComponent<IProps> = (props: RenderableProps<IProps>) => {
  return (
    <div>
      {props.children}
    </div>
  );
};

export default TabItem;
