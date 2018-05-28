import { h, FunctionalComponent } from "preact";

interface IProps {
  enable?: boolean;
  typeBar?: boolean;
}

const Loading: FunctionalComponent<IProps> = (props: IProps) => {
  if (props.typeBar) {
    return (
      props.enable && <div class="loading-bar"></div>
    );
  } else {
    return (
      props.enable && <div class="loading-spinner">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }
};

Loading.defaultProps = {
  enable: false,
  typeBar: false
};

export default Loading;
