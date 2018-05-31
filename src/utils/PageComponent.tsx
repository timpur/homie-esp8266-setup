import { h, Component } from "preact";
import { bind } from "decko";

import { Button } from "../components/ui";


export interface IPageProps {
  onBack?: () => void;
  onNext?: () => void;
}

export abstract class PageComponent<PropType extends IPageProps, StateType> extends Component<PropType, StateType> {
  private title: string;

  constructor(props: PropType, title: string) {
    super(props);
    this.title = title;
  }

  @bind
  onBack() {
    if (this.props.onBack) this.props.onBack();
  }
  @bind
  onNext() {
    if (this.props.onNext) this.props.onNext();
  }
  @bind
  disableBackButton(): boolean {
    return false;
  }
  @bind
  disableNextButton(): boolean {
    return false;
  }

  abstract renderPage(): JSX.Element;

  render() {
    return (
      <div>
        {this.renderTitle()}
        {this.renderPage()}
        {this.renderNavButtons()}
      </div>
    );
  }

  renderTitle() {
    return (
      <div class="text-center">
        <h3 class="text-big text-white">{this.title}</h3>
      </div>
    );
  }

  renderNavButtons() {
    return (
      <div>
        <Button text="Back" onClick={this.onBack} disable={this.disableBackButton()} />
        <Button text="Next" onClick={this.onNext} disable={this.disableNextButton()} />
      </div>
    );
  }
}
