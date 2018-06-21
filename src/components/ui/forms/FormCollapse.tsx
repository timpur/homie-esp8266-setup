import { h } from "preact";
import { Alignment, convertAlignmentsToClasses } from "../grid/util";
import BaseValidation, { Child } from "./BaseValidation";


interface IProps {
  label: string;
  children: Array<Child>;
  alignments?: Alignment;
  classes?: string;
}
interface IState { }


class FormCollapse extends BaseValidation<IProps, IState> {
  render() {
    const classes = convertAlignmentsToClasses(this.props.alignments);
    this.updateChildrenInError(this.props.children);
    this.props.children.forEach(child => child.attributes.collapse = true);
    return (
      <div>
        {this.renderLabel()}
        <div class={`form-collapse ${classes} ${this.inError ? "error" : null} ${this.props.classes ? this.props.classes : null}`}>
          {this.props.children}
        </div>
        {this.renderErrorFormField()}
      </div>
    );
  }

  renderLabel() {
    if (this.props.label) {
      const required = this.props.children.some(child => child.attributes.required);
      return (
        <label class="label">
          {this.props.label} {required && <span class="text-error">*</span>}
        </label>
      );
    }
  }

  renderErrorFormField() {
    if (this.inError && this.inputs) {
      return (
        <p class="text-error text-small">{this.getFirstChildInError().validationMessage}</p>
      );
    }
  }

  getFirstChildInError() {
    return this.inputs.find(input => !input.checkValidity());
  }
}

export default FormCollapse;
