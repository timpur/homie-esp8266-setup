declare module "*.png";

type ElementEvent<TElement = HTMLElement> = Event & { target: TElement };

type HTMLValidationElement = HTMLElement & {
  readonly validationMessage: string;
  readonly validity: ValidityState;
  checkValidity(): boolean;
  setCustomValidity(error: string): void;
};
