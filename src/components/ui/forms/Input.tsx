import { h, FunctionalComponent } from "preact";
import { buildCommonFormClasses, ICommonFormProps } from "./helper";


interface IStringProps extends ICommonFormProps<string> {
  type?: "text";
  maxLength?: number;
}
interface INumberProps extends ICommonFormProps<number> {
  type?: "number";
  min?: number;
  max?: number;
}
type IPropsTypes = IStringProps | INumberProps;


const Input: FunctionalComponent<IPropsTypes> = (props: IStringProps & INumberProps) => {
  return (
    <div class={`input ${buildCommonFormClasses<string | number>(props)}`}>
      <input
        id={props.id}
        name={props.id}
        placeholder={props.placeHolder}
        value={props.value}
        onChange={(event: ElementEvent<HTMLInputElement>) => callOnChange(props, event.target.value)}
        type={props.type}
        disabled={props.disable}
        required={props.required}
        pattern={props.pattern}
        min={props.min}
        max={props.max}
        maxLength={props.maxLength}
      />
    </div>
  );
};

Input.defaultProps = {
  type: "text"
};

export default Input;


function callOnChange(props: IPropsTypes, value: string) {
  if (props.type === "text") {
    props.onChange(value);
  } else if (props.type === "number") {
    props.onChange(Number(value));
  }
}
