import { IStoreState } from "../store";
import { IHomieDeviceConfig } from "./HomieDevice";
import { cleanupObject } from "./utils";


export function mapHomieConfigFromFormData(store: IStoreState): IHomieDeviceConfig {
  const mappedConfig: IHomieDeviceConfig = {
    name: store.deviceSettingsFormData.name,
    device_id: store.deviceSettingsFormData.device_id,
    device_stats_interval: store.deviceSettingsFormData.device_stats_interval,
    wifi: store.wifiFormData,
    mqtt: store.mqttFormData,
    ota: { enable: store.deviceSettingsFormData.otaEnable },
    settings: store.deviceSettingsFormData.settings
  };
  cleanupObject(mappedConfig, [null, undefined]);
  return mappedConfig;
}