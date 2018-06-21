import { h } from "preact";
import { connect } from "unistore/preact";

import { IStoreState } from "../../store";
import { PageComponent, IPageProps } from "../../components/PageComponent";
import { HomieDevice, IHomieData, IHomieDeviceNetwork } from "../../utils/HomieDevice";
import { Input, Select, Checkbox, Form } from "../../components/ui/forms";
import { BadgeLable } from "../../components/ui/badge";
import FormCollapse from "../../components/ui/forms/FormCollapse";
import FormField from "../../components/ui/forms/FormField";
import { Button } from "../../components/ui";


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
  form: Form;

  constructor(props: IProps) {
    super(props, "Wifi Settings");
    this.homieDevice = new HomieDevice(props.homieData);
  }
  componentDidMount() {
    this.homieDevice.getDeviceNetworks();
    // this.networkSearchIntervalID = setInterval(() => {
    //   this.homieDevice.getDeviceNetworks();
    // }, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.networkSearchIntervalID);
  }
  bindFormDataSetState<TProp extends keyof TFormData, TValue = TFormData[TProp]>(prop: TProp) {
    return (value: TValue) => this.props.setFormDataState(prop, value);
  }
  bindWifiFormDataSetState<TProp extends keyof TWifiFormData, TValue = TWifiFormData[TProp]>(prop: TProp) {
    return (value: TValue) => this.props.setWifiFormDataState(prop, value);
  }
  getFormatedDeviceNetworks() {
    return this.homieDevice.deviceNetworks
      .map(item => ({ label: `${item.ssid} (${item.signal}%)`, value: item.ssid }));
  }

  renderPage() {
    const manualSSID = this.props.formData.wifiManualSSID;
    const selectedNetwork = this.homieDevice.deviceNetworks.find(item => item.ssid === this.props.wifiFormData.ssid);
    const showPassword = manualSSID || (selectedNetwork && selectedNetwork.encryption !== "none");
    const showAditionalOptions = this.props.formData.wifiAditionalOptions;

    return (
      <Form ref={(form) => this.form = form}>
        <Checkbox
          id="manual"
          label="Select SSID Manually"
          value={manualSSID}
          onChange={this.bindFormDataSetState("wifiManualSSID")}
        />
        {manualSSID ?
          < FormField label="SSID">
            <Input
              id="ssid"
              value={this.props.wifiFormData.ssid}
              onChange={this.bindWifiFormDataSetState("ssid")}
            />
          </FormField>
          :
          this.renderSSIDSelect()
        }
        {
          showPassword && (
            <FormField label="Password" >
              <Input
                id="password"
                value={this.props.wifiFormData.password}
                onChange={this.bindWifiFormDataSetState("password")}
                required
              />
            </FormField>
          )
        }
        {this.renderSelectedNetwork(selectedNetwork)}
        <Checkbox
          id="advance"
          label="More Options"
          value={this.props.formData.wifiAditionalOptions}
          onChange={this.bindFormDataSetState("wifiAditionalOptions")}
        />
        {this.renderAditionalOptions(showAditionalOptions)}
      </Form >
    );
  }

  render() {
    this.homieDevice.update(this.props.homieData);
    return super.render();
  }

  renderSSIDSelect() {
    return (
      <FormCollapse label="Select SSID" alignments={{ center: "xs" }}>
        <Select
          id="ssid_select"
          label="Select your SSID"
          value={this.props.wifiFormData.ssid}
          onChange={this.bindWifiFormDataSetState("ssid")}
          options={this.getFormatedDeviceNetworks()}
          required
        />
        <Button text="🗘" onClick={() => this.homieDevice.getDeviceNetworks()} colour="secondary" />
      </FormCollapse>
    );
  }

  renderSelectedNetwork(selectedNetwork: IHomieDeviceNetwork) {
    if (selectedNetwork) {
      return (
        <p>
          <BadgeLable lable="SSID" value={selectedNetwork.ssid} />
          <BadgeLable lable="BSSID" value={selectedNetwork.bssid} />
          <BadgeLable lable="RSSI" value={`${selectedNetwork.rssi}dBi`} />
          <BadgeLable lable="Signal" value={`${selectedNetwork.signal}%`} />
          <BadgeLable lable="Encryption" value={selectedNetwork.encryption} />
        </p>
      );
    }
  }

  renderAditionalOptions(showAdditionalOptions: boolean) {
    if (showAdditionalOptions) {
      return (
        <div>
          <FormField label="BSSID">
            <Input
              id="bssid"
              value={this.props.wifiFormData.bssid}
              onChange={this.bindWifiFormDataSetState("bssid")}
            />
          </FormField>
          <FormField label="Channel" >
            <Input
              id="channel"
              type="number"
              value={this.props.wifiFormData.channel}
              onChange={this.bindWifiFormDataSetState("channel")}
            />
          </FormField>
          <FormField label="IP Address">
            <Input
              id="ip"
              value={this.props.wifiFormData.ip}
              onChange={this.bindWifiFormDataSetState("ip")}
            />
          </FormField>
          <FormField label="Gateway Address">
            <Input
              id="gw"
              value={this.props.wifiFormData.gw}
              onChange={this.bindWifiFormDataSetState("gw")}
            />
          </FormField>
          <FormField label="Network Mask">
            <Input
              id="mask"
              value={this.props.wifiFormData.mask}
              onChange={this.bindWifiFormDataSetState("mask")}
            />
          </FormField>
          <FormField label="DNS 1">
            <Input
              id="dns1"
              value={this.props.wifiFormData.dns1}
              onChange={this.bindWifiFormDataSetState("dns1")}
            />
          </FormField>
          <FormField label="DNS 2">
            <Input
              id="dns2"
              value={this.props.wifiFormData.dns2}
              onChange={this.bindWifiFormDataSetState("dns2")}
            />
          </FormField>
        </div>
      );
    }
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
