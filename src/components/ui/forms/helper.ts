export interface ICommonFormProps<T> {
  id: string;
  label?: string;
  placeHolder?: string;
  value: T;
  onChange: (value: T) => void;
  disable?: boolean;
  required?: boolean;
  pattern?: string;
  collapse?: boolean;
  inError?: boolean;
  fullWidth?: boolean;
}


export function buildCommonFormClasses<T>(props: ICommonFormProps<T>) {
  return [
    props.fullWidth ? "full-width" : null,
    props.collapse ? "item" : null,
    props.inError ? "error" : null,
    props.disable ? "disable" : null
  ]
    .filter(item => !!item)
    .join(" ");
}
