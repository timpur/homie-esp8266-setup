import { h, FunctionalComponent } from "preact";


interface IProps {
  id: string;
  label?: string;
  placeholder?: string;
  value: string;
  options: Array<{ label?: string; value: string; }>;
  onChange: (value: string) => void;
}

const Select: FunctionalComponent<IProps> = (props: IProps) => {
  return (
    <div>
      {props.label ? <label class="label" for={props.id}>{props.label}</label> : null}
      <div class="select">
        <select
          id={props.id}
          name={props.id}
          placeholder={props.placeholder}
          value={props.value}
          onChange={(event: ElementEvent<HTMLInputElement>) => props.onChange(event.target.value)}
        >
          {props.options.map(item => (<option value={item.value}>{item.label || item.value}</option>))}
        </select>
      </div>
    </div>
  );
};

export default Select;
