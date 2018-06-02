import { h, Component, VNode } from "preact";
import { bind } from "decko";

import { IProps as TabItemProps } from "./TabItem";


interface IProps {
  children: Array<VNode<TabItemProps>>;
}
interface IState {
  activeTabID: string;
}

class Tab extends Component<IProps, IState> {

  get activeTabItem() {
    return this.props.children.find(tab => tab.attributes.id === this.state.activeTabID);
  }

  @bind
  componentDidMount() {
    const defaultTab = this.props.children[0] as VNode<TabItemProps>;
    this.selectTab(defaultTab.attributes.id);
  }

  previousTab() {
    const { children } = this.props;
    const currentIndex = children.indexOf(this.activeTabItem);
    const previousIndex = Math.max(currentIndex - 1, 0);
    this.selectTab(children[previousIndex].attributes.id);
  }
  nextTab() {
    const { children } = this.props;
    const currentIndex = children.indexOf(this.activeTabItem);
    const nextIndex = Math.min(currentIndex + 1, children.length - 1);
    this.selectTab(children[nextIndex].attributes.id);
  }

  @bind
  selectTab(tabID: string) {
    this.setState({ activeTabID: tabID });
  }

  render() {
    return (
      <div>
        <div class="tabs">
          {this.props.children.map(tab => (
            <a
              href="#"
              class={`tab ${tab === this.activeTabItem ? "active" : null}`}
              onClick={() => this.selectTab(tab.attributes.id)}
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
