import { h, Component, VNode } from "preact";
import { bind } from "decko";

import { IProps as TabItemProps } from "./TabItem";


interface IProps {
  children: Array<VNode<TabItemProps>>;
  activeTabID: string;
  onTabClick: (tabID: string) => void;
}
interface IState { }

class Tab extends Component<IProps, IState> {

  get activeTabItem() {
    return this.props.children.find(tab => tab.attributes.id === this.props.activeTabID);
  }

  @bind
  previousTab() {
    const { children } = this.props;
    const currentIndex = children.indexOf(this.activeTabItem);
    const previousIndex = Math.max(currentIndex - 1, 0);
    return children[previousIndex].attributes.id;
  }
  @bind
  nextTab() {
    const { children } = this.props;
    const currentIndex = children.indexOf(this.activeTabItem);
    const nextIndex = Math.min(currentIndex + 1, children.length - 1);
    return children[nextIndex].attributes.id;
  }
  @bind
  defaultTab() {
    const defaultChild = this.props.children[0] as VNode<TabItemProps>;
    return defaultChild.attributes.id;
  }

  render() {
    return (
      <div>
        <div class="tabs">
          {this.props.children.map(tab => (
            <a
              href="#"
              class={`tab ${tab === this.activeTabItem ? "active" : null}`}
              onClick={() => this.props.onTabClick(tab.attributes.id)}
            >
              {tab.attributes.title}
            </a>
          ))}
        </div>
        {this.activeTabItem}
      </div>
    );
  }
}

export default Tab;
