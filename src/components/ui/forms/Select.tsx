import { h, FunctionalComponent } from "preact";
import { ICommonFormProps, buildCommonFormClasses } from "./helper";


interface IProps extends ICommonFormProps<string> {
  options: Array<{ label?: string; value: string; }>;
}


const Select: FunctionalComponent<IProps> = (props: IProps) => {
  return (
    <div class={`select ${buildCommonFormClasses(props)}`}>
      <select
        id={props.id}
        name={props.id}
        placeholder={props.placeHolder}
        value={props.value}
        onChange={(event: ElementEvent<HTMLInputElement>) => props.onChange(event.target.value)}
        required={props.required}
        pattern={props.pattern}
      >
        {props.options.map(item => (<option value={item.value}>{item.label || item.value}</option>))}
      </select>
      <i>⌄</i>
    </div>
  );
};

export default Select;
