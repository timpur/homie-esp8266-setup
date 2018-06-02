import { h, Component, VNode } from "preact";
import { bind } from "decko";

import { IProps as TabItemProps } from "./TabItem";


interface IProps { }
interface IState {
  activeTabID: string;
}

class Tab extends Component<IProps, IState> {

  @bind
  componentDidMount() {
    const defaultTab = this.props.children[0] as VNode<TabItemProps>;
    this.onTabSelect(defaultTab.attributes.id);
  }

  @bind
  onTabSelect(tabID: string) {
    this.setState({ activeTabID: tabID });
  }

  render() {
    const children = this.props.children as Array<VNode<TabItemProps>>;
    const activeTabItem = children.find(tab => tab.attributes.id === this.state.activeTabID);
    return (
      <div>
        <div class="tabs">
          {children.map(tab => (
            <a
              href="#"
              class={`tab ${tab === activeTabItem ? "active" : null}`}
              onClick={() => this.onTabSelect(tab.attributes.id)}
            >
              {tab.attributes.title}
            </a>
          ))}
        </div>
        {activeTabItem}
      </div>
    );
  }
}

export default Tab;
