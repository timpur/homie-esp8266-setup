import { h, FunctionalComponent } from "preact";

interface IProps {
  show?: boolean;
  typeBar?: boolean;
}

const Loading: FunctionalComponent<IProps> = (props: IProps) => {
  if (props.typeBar) {
    return (
      props.show && <div class="loading-bar"></div>
    );
  } else {
    return (
      props.show && <div class="loading-spinner">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }
};

Loading.defaultProps = {
  show: false,
  typeBar: false
};

export default Loading;
