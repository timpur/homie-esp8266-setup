import { bind } from "decko";
import { store, IStoreState } from "../store";


export interface IHomieData {
  url: string;
  status: boolean;
  deviceInfo: IHomieDeviceInfo;
  deviceConfig: IHomieDeviceConfig;
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
  device_id: string;
  device_stats_interval: number;
  wifi: {
    ssid: string;
    password: string;
    bssid: string;
    channel: number;
    ip: string;
    mask: string;
    gw: string;
    dns1: string;
    dns2: string;
  };
  mqtt: {
    host: string;
    port: number;
    base_topic: string;
    auth: boolean;
    username: string;
    password: string;
    ssl: boolean;
    ssl_fingerprint: string;
  };
  ota: {
    enable: boolean;
  };
  settings: {
    [key: string]: any;
  };
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

  constructor(homieData: IHomieData) {
    this.homieData = homieData;
  }

  update(homieData: IHomieData) {
    this.homieData = homieData;
  }

  @bind
  findDevice(): Promise<void> {
    return new Promise<void>((resolve) => {
      const checkForDevice = () => {
        this.heatBeat()
          .then((status) => {
            if (status) resolve();
            else checkForDevice();
          });
      };
      checkForDevice();
    });
  }

  @bind
  heatBeat(): Promise<boolean> {
    return fetch(`${this.url}/heart`)
      .catch(() => ({ ok: false } as Response))
      .then((res) => res.ok)
      .then((status) => {
        this.status = status;
        return status;
      });
  }

  @bind
  getDeviceInfo(): Promise<void> {
    return fetch(`${this.url}/device-info`)
      .then((res) => res.json() as Promise<IHomieDeviceInfo>)
      .then((deviceInfo) => {
        this.deviceInfo = deviceInfo;
      });
  }

  @bind
  getDeviceConfig(): Promise<void> {
    return fetch(`${this.url}/config`)
      .then((res) => res.json() as Promise<IHomieDeviceConfig>)
      .then((deviceConfig) => {
        this.deviceConfig = deviceConfig;
      });
  }
}
