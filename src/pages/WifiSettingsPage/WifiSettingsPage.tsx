import { h } from "preact";
import { connect } from "unistore/preact";

import { IStoreState } from "../../store";
import { PageComponent, IPageProps } from "../../components/PageComponent";
import { HomieDevice, IHomieData, IHomieDeviceNetwork } from "../../utils/HomieDevice";
import { Input, Select, Checkbox, Form } from "../../components/ui/forms";
import { BadgeLabel } from "../../components/ui/badge";
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
  form: Form;

  constructor(props: IProps) {
    super(props, "Wifi Settings");
    this.homieDevice = new HomieDevice(props.homieData);
  }

  componentDidMount() {
    this.homieDevice.getDeviceNetworks();
  }

  bindFormDataSetState<TProp extends keyof TFormData, TValue = TFormData[TProp]>(prop: TProp) {
    return (value: TValue) => this.props.setFormDataState(prop, value);
  }

  bindWifiFormDataSetState<TProp extends keyof TWifiFormData, TValue = TWifiFormData[TProp]>(prop: TProp) {
    return (value: TValue) => this.props.setWifiFormDataState(prop, value);
  }

  getFormattedDeviceNetworks() {
    return this.homieDevice.deviceNetworks
      .map(item => ({ label: `${item.ssid} (${item.signal}%)`, value: item.ssid }));
  }

  disableNextButton() {
    return this.form && this.form.inError;
  }

  renderPage() {
    const manualSSID = this.props.formData.wifiManualSSID;
    const selectedNetwork = this.homieDevice.deviceNetworks.find(item => item.ssid === this.props.wifiFormData.ssid);
    const showPassword = manualSSID || (selectedNetwork && selectedNetwork.encryption !== "none");
    const showAdditionalOptions = this.props.formData.wifiAdditionalOptions;

    return (
      <Form ref={(form) => this.form = form}>
        <Checkbox
          id="manual"
          label="Select SSID Manually"
          value={manualSSID}
          onChange={this.bindFormDataSetState("wifiManualSSID")}
        />
        {manualSSID ? this.renderSSID() : this.renderSSIDSelect()}
        {showPassword && this.renderPassword()}
        {selectedNetwork && this.renderSelectedNetwork(selectedNetwork)}
        <Checkbox
          id="advance"
          label="More Options"
          value={this.props.formData.wifiAdditionalOptions}
          onChange={this.bindFormDataSetState("wifiAdditionalOptions")}
        />
        {showAdditionalOptions && this.renderAdditionalOptions()}
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
          options={this.getFormattedDeviceNetworks()}
          required
        />
        <Button text="🗘" onClick={() => this.homieDevice.getDeviceNetworks()} colour="secondary" />
      </FormCollapse>
    );
  }

  renderSelectedNetwork(selectedNetwork: IHomieDeviceNetwork) {
    return (
      <p>
        <BadgeLabel label="SSID" value={selectedNetwork.ssid} />
        <BadgeLabel label="BSSID" value={selectedNetwork.bssid} />
        <BadgeLabel label="RSSI" value={`${selectedNetwork.rssi}dBi`} />
        <BadgeLabel label="Signal" value={`${selectedNetwork.signal}%`} />
        <BadgeLabel label="Encryption" value={selectedNetwork.encryption} />
      </p>
    );
  }

  renderSSID() {
    return (
      < FormField label="SSID">
        <Input
          id="ssid"
          value={this.props.wifiFormData.ssid}
          onChange={this.bindWifiFormDataSetState("ssid")}
        />
      </FormField>
    );
  }

  renderPassword() {
    return (
      <FormField label="Password" >
        <Input
          id="password"
          value={this.props.wifiFormData.password}
          onChange={this.bindWifiFormDataSetState("password")}
          required
        />
      </FormField>
    );
  }

  renderAdditionalOptions() {
    const { ip, gw, mask } = this.props.wifiFormData;
    const staticIPSet = !!ip || !!gw || !!mask;
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
            disable={!this.props.wifiFormData.bssid}
            required={!!this.props.wifiFormData.bssid}
            min={0}
            max={12}
          />
        </FormField>
        <FormField label="IP Address">
          <Input
            id="ip"
            value={this.props.wifiFormData.ip}
            onChange={this.bindWifiFormDataSetState("ip")}
            required={staticIPSet}
          />
        </FormField>
        <FormField label="Gateway Address">
          <Input
            id="gw"
            value={this.props.wifiFormData.gw}
            onChange={this.bindWifiFormDataSetState("gw")}
            required={staticIPSet}
          />
        </FormField>
        <FormField label="Network Mask">
          <Input
            id="mask"
            value={this.props.wifiFormData.mask}
            onChange={this.bindWifiFormDataSetState("mask")}
            required={staticIPSet}
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
            disable={!this.props.wifiFormData.dns1}
          />
        </FormField>
      </div>
    );
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
