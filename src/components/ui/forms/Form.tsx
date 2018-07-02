import { h, Component } from "preact";


interface IProps {
  onValidationChange?: (isValid: boolean) => void;
}
interface IState { }

class Form extends Component<IProps, IState> {
  base: HTMLFormElement;
  previouslyInError: boolean;

  get inError() {
    if (this.base) return !this.base.checkValidity();
    return false;
  }

  componentDidMount() {
    this.checkFormInError();
  }

  componentDidUpdate() {
    this.checkFormInError();
  }

  checkFormInError() {
    const inError = this.inError;
    if (inError !== this.previouslyInError) {
      this.previouslyInError = inError;
      if (this.props.onValidationChange) this.props.onValidationChange(inError);
    }
  }

  render() {
    return (
      <form action="">
        {this.props.children}
      </form>
    );
  }
}

export default Form;
