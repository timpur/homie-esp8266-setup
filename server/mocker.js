const proxy = {
  'GET /heart': (req, res) => {
    res.status(204);
    res.send()
  },
  'GET /device-info': {
    "hardware_device_id": "52a8fa5d",
    "homie_version": "2.0.0",
    "homie_esp8266_version": "2.1.0",
    "device_config_state": false,
    "device_config_state_error": "ERROR MESSAGE",
    "firmware": {
      "name": "awesome-device",
      "version": "1.0.0"
    },
    "nodes": [
      {
        "id": "light",
        "type": "light"
      }
    ],
    "settings": [
      {
        "name": "timeout",
        "description": "Timeout in seconds",
        "type": "ulong",
        "required": false,
        "default": 10
      }
    ]
  },
  'GET /networks': {
    "networks": [
      { "ssid": "Network_1", "bssid": "ma:c0:0a:dd:re:ss:", "rssi": -82, "signal": 40, "encryption": "wep" },
      { "ssid": "Network_2", "bssid": "ma:c0:0a:dd:re:ss:", "rssi": -57, "signal": 70, "encryption": "wpa" },
      { "ssid": "Network_3", "bssid": "ma:c0:0a:dd:re:ss:", "rssi": -65, "signal": 60, "encryption": "wpa2" },
      { "ssid": "Network_5", "bssid": "ma:c0:0a:dd:re:ss:", "rssi": -94, "signal": 10, "encryption": "none" },
      { "ssid": "Network_4", "bssid": "ma:c0:0a:dd:re:ss:", "rssi": -89, "signal": 35, "encryption": "auto" }
    ]
  },
  'GET /config': {
    "name": "The kitchen light",
    "device_id": "kitchen-light",
    "device_stats_interval": 60,
    "wifi": {
      "ssid": "Network_1",
      "password": "I'm a Wi-Fi password!",
      "bssid": "DE:AD:BE:EF:BA:BE",
      "channel": 1,
      "ip": "192.168.1.5",
      "mask": "255.255.255.0",
      "gw": "192.168.1.1",
      "dns1": "8.8.8.8",
      "dns2": "8.8.4.4"
    },
    "mqtt": {
      "host": "192.168.1.10",
      "port": 1883,
      "base_topic": "devices/",
      "auth": true,
      "username": "user",
      "password": "pass",
      "ssl": true,
      "ssl_fingerprint": "a27992d3420c89f293d351378ba5f5675f74fe3c"
    },
    "ota": {
      "enabled": true
    },
    "settings": {
      "percentage": 55
    }
  },
  'PUT /config': (req, res) => {
    res.json({
      "success": true
    })
  },
  'POST /config/patch': (req, res) => {
    res.json({
      "success": true
    })
  }
}

module.exports = proxy;
