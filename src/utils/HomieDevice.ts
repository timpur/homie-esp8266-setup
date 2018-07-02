import { bind } from "decko";
import { store, IStoreState } from "../store";


export interface IHomieData {
  url: string;
  status: boolean;
  deviceInfo: IHomieDeviceInfo;
  deviceConfig: IHomieDeviceConfig;
  deviceNetworks: Array<IHomieDeviceNetwork>;
}

export interface IHomieDeviceInfo {
  hardware_device_id: string;
  homie_version: string;
  homie_esp8266_version: string;
  device_config_state: string;
  device_config_state_error: string;
  firmware: {
    name: string;
    version: string;
  };
  nodes: Array<{
    id: string;
    type: string;
  }>;
  settings: Array<{
    name: string;
    description: string;
    type: string;
    required: boolean;
    default: any;
  }>;
}

export interface IHomieDeviceConfig {
  name: string;
  device_id?: string;
  device_stats_interval?: number;
  wifi: {
    ssid: string;
    password: string;
    bssid?: string;
    channel?: number;
    ip?: string;
    mask?: string;
    gw?: string;
    dns1?: string;
    dns2?: string;
  };
  mqtt: {
    host: string;
    port?: number;
    base_topic?: string;
    auth?: boolean;
    username?: string;
    password?: string;
    ssl?: boolean;
    ssl_fingerprint?: string;
  };
  ota: {
    enable: boolean;
  };
  settings: {
    [key: string]: any;
  };
}

export interface IHomieDeviceNetwork {
  ssid: string;
  bssid: string;
  rssi: number;
  signal: number;
  encryption: "wep" | "wpa" | "wpa2" | "none" | "auto";
}

export const actions = {
  setURL: store.action((state: IStoreState, url: string) => {
    return {
      homieData: {
        ...state.homieData,
        url
      }
    };
  }),
  setStatus: store.action((state: IStoreState, status: boolean) => {
    return {
      homieData: {
        ...state.homieData,
        status
      }
    };
  }),
  setDeviceInfo: store.action((state: IStoreState, deviceInfo: IHomieDeviceInfo) => {
    return {
      homieData: {
        ...state.homieData,
        deviceInfo
      }
    };
  }),
  setDeviceConfig: store.action((state: IStoreState, deviceConfig: IHomieDeviceConfig) => {
    return {
      homieData: {
        ...state.homieData,
        deviceConfig
      }
    };
  }),
  setDeviceNetworks: store.action((state: IStoreState, deviceNetworks: Array<IHomieDeviceNetwork>) => {
    return {
      homieData: {
        ...state.homieData,
        deviceNetworks
      }
    };
  })
};


export class HomieDevice {
  private homieData: IHomieData;

  get url() { return this.homieData.url; }
  set url(value: string) { actions.setURL(value); }

  get status() { return this.homieData.status; }
  set status(value: boolean) { actions.setStatus(value); }

  get deviceInfo() { return this.homieData.deviceInfo; }
  set deviceInfo(value: IHomieDeviceInfo) { actions.setDeviceInfo(value); }
  get hasDeviceInfo() { return !!this.homieData.deviceInfo.hardware_device_id; }

  get deviceConfig() { return this.homieData.deviceConfig; }
  set deviceConfig(value: IHomieDeviceConfig) { actions.setDeviceConfig(value); }
  get hasDeviceConfig() { return !!this.homieData.deviceConfig.wifi; }

  get deviceNetworks() { return this.homieData.deviceNetworks; }
  set deviceNetworks(value: Array<IHomieDeviceNetwork>) { actions.setDeviceNetworks(value); }
  get hasDeviceNetworks() { return !this.homieData.deviceNetworks.length; }

  constructor(homieData: IHomieData) {
    this.homieData = homieData;
  }

  update(homieData: IHomieData) {
    this.homieData = homieData;
  }

  @bind
  async findDevice() {
    const checkForDevice = async () => {
      const status = await this.heatBeat();
      if (status) return;
      else setTimeout(async () => await checkForDevice(), 5000);
    };
    await checkForDevice();
  }

  @bind
  async heatBeat() {
    try {
      const res = await fetch(`${this.url}/heart`);
      const status = res.ok;
      this.status = status;
      return status;
    } catch (error) {
      return false;
    }
  }

  @bind
  async getDeviceInfo() {
    const res = await fetch(`${this.url}/device-info`);
    const deviceInfo = await (res.json() as Promise<IHomieDeviceInfo>);
    this.deviceInfo = deviceInfo;
  }

  @bind
  async getDeviceConfig() {
    const res = await fetch(`${this.url}/config`);
    const deviceConfig = await (res.json() as Promise<IHomieDeviceConfig>);
    this.deviceConfig = deviceConfig;
  }

  @bind
  async getDeviceNetworks() {
    type Response = { networks: Array<IHomieDeviceNetwork> };
    const res = await fetch(`${this.url}/networks`);
    const deviceNetworks = await (res.json() as Promise<Response>);
    this.deviceNetworks = deviceNetworks.networks;
  }

  // @bind
  // sendConfig() {

  // }
}
