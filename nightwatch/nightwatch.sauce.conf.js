module.exports = {
  "globals_path": "globals.js",
  "output_folder": false,
  "src_folders": ["specs"],
  "test_settings": {
    "default": {
      "screenshots": {
        "enabled": false,
        "path": ""
      },
      "launch_url": process.env.LAUNCH_URL,
      "selenium_host": "ondemand.saucelabs.com",
      "selenium_port": 80,
      "silent": true,
      "username": process.env.SAUCE_USERNAME,
      "access_key": process.env.SAUCE_ACCESS_KEY,
      "globals": {
        "waitForConditionTimeout": 10000
      },
      "chrome": {
        "desiredCapabilities": {
          "browserName": "chrome",
          "platform": "OS X 10.11",
          "version": "47"
        }
      },
      "ie11": {
        "desiredCapabilities": {
          "browserName": "internet explorer",
          "platform": "Windows 10",
          "version": "11.0"
        }
      }
    }
  }
}
