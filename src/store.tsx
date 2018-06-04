import { h } from "preact";
import createStore, { Store } from "unistore";
import { Provider } from "unistore/preact";
// import * as devtools from 'unistore/devtools';

import { IHomieData, IHomieDeviceInfo, IHomieDeviceConfig } from "./utils/HomieDevice";

export interface IStoreState extends Object {
  homieData: IHomieData;
}
export type TStore = Store<IStoreState>;

const initalState: IStoreState = {
  homieData: {
    url: "http://localhost:3000",// "http://192.168.123.1",
    status: false,
    deviceInfo: {} as IHomieDeviceInfo,
    deviceConfig: {} as IHomieDeviceConfig
  }
};

export const store: TStore = createStore(initalState);

import App from "./App";
export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
