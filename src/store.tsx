import { h } from "preact";
import createStore, { Store } from "unistore";
import { Provider } from "unistore/preact";
import devtools from "unistore/devtools";

import { IHomieData, IHomieDeviceInfo, IHomieDeviceConfig } from "./utils/HomieDevice";

export interface IStoreState extends Object {
  activeTabID: string;
  homieData: IHomieData;
  formData: {
    wifiManualSSID?: boolean;
    wifiAditionalOptions?: boolean;
  };
  wifiFormData: IHomieDeviceConfig["wifi"];
  mqttFormData: IHomieDeviceConfig["mqtt"];
  deviceSettingsFormData: {
    name: IHomieDeviceConfig["name"]
    device_id?: IHomieDeviceConfig["device_id"];
    device_stats_interval?: IHomieDeviceConfig["device_stats_interval"]
    otaEnable: IHomieDeviceConfig["ota"]["enable"]
    settings: IHomieDeviceConfig["settings"];
  };
}
export type TStore = Store<IStoreState>;

const initalState: IStoreState = {
  activeTabID: "",
  homieData: {
    url: "http://localhost:3000",// "http://192.168.123.1",
    status: false,
    deviceInfo: {} as IHomieDeviceInfo,
    deviceConfig: {} as IHomieDeviceConfig,
    deviceNetworks: []
  },
  formData: {},
  wifiFormData: {
    ssid: null,
    password: null
  },
  mqttFormData: {
    host: null
  },
  deviceSettingsFormData: {
    name: null,
    otaEnable: false,
    settings: {}
  }
};

export const store: TStore = devtools(createStore(initalState));

import App from "./App";
export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
