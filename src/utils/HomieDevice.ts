import { bind } from "decko";
import { store, IStoreState } from "../store";


export interface IHomieData {
  url: string;
  status: boolean;
  deviceInfo: IHomieDeviceInfo;
}

export interface IHomieDeviceInfo {
  hardware_device_id: string;
  homie_version: string;
  homie_esp8266_version: string;
  device_config_state: string;
  device_config_state_error: string;
  firmware: { name: string; version: string; };
  nodes: Array<{ id: string; type: string; }>;
  settings: Array<{ name: string; description: string; type: string; required: boolean; default: any; }>;
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
  getInfo(): Promise<void> {
    return fetch(`${this.url}/device-info`)
      .then((res) => res.json() as Promise<IHomieDeviceInfo>)
      .then((deviceInfo) => {
        this.deviceInfo = deviceInfo;
      });
  }
}
