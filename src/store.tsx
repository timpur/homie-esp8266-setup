import { h } from "preact";
import createStore, { Store } from "unistore";
import { Provider } from "unistore/preact";

import { IHomieData, IHomieDeviceInfo } from "./utils/HomieDevice";

export interface IStoreState extends Object {
  homieData: IHomieData;
}
export type TStore = Store<IStoreState>;

const initalState: IStoreState = {
  homieData: {
    url: "http://localhost:3000",// "http://192.168.123.1",
    status: false,
    deviceInfo: {} as IHomieDeviceInfo
  }
};

export const store: TStore = createStore(initalState);

import App from "./app";
export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
