import { h } from "preact";
import { bind } from "decko";
import { connect } from "unistore/preact";

import { IStoreState } from "../../store";
import { PageComponent, IPageProps } from "../../utils/PageComponent";
import { HomieDevice, IHomieData } from "../../utils/HomieDevice";
import { Input, Select, Checkbox } from "../../components/ui/forms";
import { BadgeLable } from "../../components/ui/badge";


type TFormData = IStoreState["formData"];
type TWifiFormData = IStoreState["wifiFormData"];
interface IProps extends IPageProps {
  homieData: IHomieData;
  formData: TFormData;
  wifiFormData: TWifiFormData;
  setFormDataState: <TProp extends keyof TFormData, TValue = TFormData[TProp]>(prop: TProp, value: TValue) => void;
  setWifiFormDataState: <TProp extends keyof TWifiFormData, TValue = TWifiFormData[TProp]>(prop: TProp, value: TValue) => void;
}
interface IState { }

class WifiSettingsPage extends PageComponent<IProps, IState> {
  homieDevice: HomieDevice;
  networkSearchIntervalID: number;

  constructor(props: IProps) {
    super(props, "Wifi Settings");
    this.homieDevice = new HomieDevice(props.homieData);
  }
  @bind
  componentDidMount() {
    this.homieDevice.getDeviceNetworks();
    this.networkSearchIntervalID = setInterval(() => {
      this.homieDevice.getDeviceNetworks();
    }, 5000);
  }
  @bind
  componentWillUnmount() {
    clearInterval(this.networkSearchIntervalID);
  }
  @bind
  bindFormDataSetState<TProp extends keyof TFormData, TValue = TFormData[TProp]>(prop: TProp) {
    return (value: TValue) => this.props.setFormDataState(prop, value);
  }
  @bind
  bindWifiFormDataSetState<TProp extends keyof TWifiFormData, TValue = TWifiFormData[TProp]>(prop: TProp) {
    return (value: TValue) => this.props.setWifiFormDataState(prop, value);
  }
  @bind
  getFormatedDeviceNetworks() {
    return this.homieDevice.deviceNetworks
      .map(item => ({ label: `${item.ssid} (${item.signal}%)`, value: item.ssid }));
  }

  renderPage() {
    const manualSSID = this.props.formData.manualSSID;
    const showPassword = manualSSID;
    const selectedNetwork = this.homieDevice.deviceNetworks.find(item => item.ssid === this.props.wifiFormData.ssid);
    return (
      <div>
        <Checkbox
          id="manual"
          label="Select SSID Manually"
          value={manualSSID}
          onChange={this.bindFormDataSetState("manualSSID")}
        />
        {!manualSSID ?
          (
            <Select
              id="ssid_select"
              label="Select your SSID"
              value={this.props.wifiFormData.ssid}
              onChange={this.bindWifiFormDataSetState("ssid")}
              options={this.getFormatedDeviceNetworks()}
            />
          ) : (
            <Input
              id="ssid"
              label="SSID"
              value={this.props.wifiFormData.ssid}
              onChange={this.bindWifiFormDataSetState("ssid")}
            />
          )}
        {showPassword && (
          <Input
            id="password"
            label="Password"
            value={this.props.wifiFormData.password}
            onChange={this.bindWifiFormDataSetState("password")}
          />
        )}
        {selectedNetwork && <p>
          <BadgeLable lable="SSID" value={selectedNetwork.ssid} />
          <BadgeLable lable="BSSID" value={selectedNetwork.bssid} />
          <BadgeLable lable="RSSI" value={`${selectedNetwork.rssi}dBi`} />
          <BadgeLable lable="Signal" value={`${selectedNetwork.signal}%`} />
          <BadgeLable lable="Encryption" value={selectedNetwork.encryption} />
        </p>}
      </div>
    );
  }

  render() {
    this.homieDevice.update(this.props.homieData);
    return super.render();
  }
}

const mapActionsToProps = {
  setFormDataState: (state: IStoreState, prop: string, value: any) => {
    return {
      formData: {
        ...state.formData,
        [prop]: value
      }
    };
  },
  setWifiFormDataState: (state: IStoreState, prop: string, value: any) => {
    return {
      wifiFormData: {
        ...state.wifiFormData,
        [prop]: value
      }
    };
  }
};

export default connect(["homieData", "formData", "wifiFormData"], mapActionsToProps)(WifiSettingsPage);
