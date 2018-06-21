import { h } from "preact";
import BaseValidation, { Child } from "./BaseValidation";


interface IProps {
  children: Child;
  label: string;
}
interface IState { }


class FormField extends BaseValidation<IProps, IState> {
  render() {
    this.updateChildrenInError(this.props.children as Array<Child>);
    return (
      <div class="from-input">
        {this.renderLabel()}
        {this.props.children}
        {this.renderErrorFormField()}
      </div>
    );
  }

  renderLabel() {
    if (this.props.label) {
      const child = this.props.children[0] as Child;
      return (
        <label class="label" for={child.attributes.id}>
          {this.props.label} {child.attributes.required && <span class="text-error">*</span>}
        </label>
      );
    }
  }

  renderErrorFormField() {
    if (this.inError && this.inputs) {
      return (
        <p class="text-error text-small">{this.inputs[0].validationMessage}</p>
      );
    }
  }
}

export default FormField;
