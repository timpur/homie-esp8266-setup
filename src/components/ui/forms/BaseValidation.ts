import { VNode, Component } from "preact";
import { ICommonFormProps } from "./helper";


export type Child = VNode<ICommonFormProps<any>>;
interface IProps {
  children: Array<Child> | Child;
}
interface IState { }


abstract class BaseValidation<TProps, TState> extends Component<TProps & IProps, TState & IState> {
  previouslyInError: boolean;
  get inputs(): Array<HTMLValidationElement> {
    if (this.base) return Array.from(this.base.querySelectorAll("input, select"));
    return [];
  }
  get inError() {
    if (this.base) return this.inputs.some(input => !input.checkValidity());
    return false;
  }

  componentDidMount() {
    this.checkComponentError();
  }
  componentDidUpdate() {
    this.checkComponentError();
  }

  checkComponentError() {
    const inError = this.inError;
    if (inError !== this.previouslyInError) {
      this.previouslyInError = inError;
      this.forceUpdate();
    }
  }

  isChildInError(index: number) {
    if (this.base) {
      const inputs = this.inputs;
      if (index < inputs.length) return !this.inputs[index].checkValidity();
    }
    return false;
  }

  updateChildrenInError(children: Array<Child>) {
    children.forEach((child, index) => child.attributes.inError = this.isChildInError(index));
  }
}

export default BaseValidation;
