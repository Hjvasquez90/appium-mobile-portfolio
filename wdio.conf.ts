import path from "path"

export const config = {
    runner: "local",
    tsConfigPath: "./tsconfig.json",
    port: 4723,

    specs: ["./test/specs/**/*.ts"],
    exclude: [],

    maxInstances: 1,
    capabilities: [{
        platformName: "Android",
        "appium:deviceName": "Pixel_6",
        "appium:platformVersion": "13.0",
        "appium:automationName": "UiAutomator2",
        "appium:app": path.join(process.cwd(), "apps", "ApiDemos-debug.apk"),
        "appium:newCommandTimeout": 240,
        "appium:autoGrantPermissions": true,
    }],

    logLevel: "info",
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: ["appium"],

    framework: "mocha",
    reporters: [
        "spec",
        ["allure", {
            outputDir: "allure-results",
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],

    mochaOpts: {
        ui: "bdd",
        timeout: 60000
    },

    afterTest: async function(test: any, context: any, { error, passed }: any) {
        if (!passed) {
            await browser.takeScreenshot()
        }
    },
}
