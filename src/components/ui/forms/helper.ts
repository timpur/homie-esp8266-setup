export interface ICommonFormProps<T> {
  id: string;
  label?: string;
  placeholder?: string;
  value: T;
  onChange: (value: T) => void;
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
    props.inError ? "error" : null
  ]
    .filter(item => !!item)
    .join(" ");
}
