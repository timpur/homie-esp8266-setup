declare module "*.png";

type ElementEvent<TElement = HTMLElement> = Event & { target: TElement };
