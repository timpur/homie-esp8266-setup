import { h, FunctionalComponent } from "preact";


interface IProps {
  id: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const Input: FunctionalComponent<IProps> = (props: IProps) => {
  return (
    <div>
      {props.label ? <label class="label" for={props.id}>{props.label}</label> : null}
      <div class="input">
        <input
          id={props.id}
          name={props.id}
          placeholder={props.placeholder}
          value={props.value}
          onChange={(event: ElementEvent<HTMLInputElement>) => props.onChange(event.target.value)}
          type="text"
        />
      </div>
    </div>
  );
};

export default Input;
