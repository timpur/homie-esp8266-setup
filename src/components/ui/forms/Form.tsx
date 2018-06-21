import { h, Component } from "preact";


interface IProps {
  onValidationChange?: (isValid: boolean) => void;
}
interface IState {
  isValid: boolean;
}

class Form extends Component<IProps, IState> {
  base: HTMLFormElement;

  get isValid() {
    if (this.base) return this.base.checkValidity();
    return true;
  }

  componentDidUpdate() {
    const isValid = this.isValid;
    if (isValid !== this.state.isValid) {
      this.setState({ isValid });
      if (this.props.onValidationChange) this.props.onValidationChange(isValid);
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
