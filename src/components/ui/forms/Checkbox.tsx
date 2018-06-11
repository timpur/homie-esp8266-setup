import { h, FunctionalComponent } from "preact";


interface IProps {
  id: string;
  label?: string;
  placeholder?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const Checkbox: FunctionalComponent<IProps> = (props: IProps) => {
  return (
    <div class="checkbox inline-block">
      <input
        id={props.id}
        name={props.id}
        placeholder={props.placeholder}
        checked={props.value}
        onChange={(event: ElementEvent<HTMLInputElement>) => props.onChange(event.target.checked)}
        type="checkbox"
      />
      {props.label ? <label for={props.id}>{props.label}</label> : null}
    </div>
  );
};

export default Checkbox;
