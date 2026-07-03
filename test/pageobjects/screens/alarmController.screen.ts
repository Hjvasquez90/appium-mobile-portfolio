import BaseScreen from "./base.screen"

class AlarmControllerScreen extends BaseScreen {

    get oneShotAlarmBtn() {
        return $("android=new UiSelector().resourceId(\"io.appium.android.apis:id/one_shot\")")
    }

    get startRepeatingAlarmBtn() {
        return $("android=new UiSelector().resourceId(\"io.appium.android.apis:id/start_repeating\")")
    }

    get stopRepeatingAlarmBtn() {
        return $("android=new UiSelector().resourceId(\"io.appium.android.apis:id/stop_repeating\")")
    }

    async waitForScreen() {
        await this.waitForDisplayed(await this.oneShotAlarmBtn)
    }

    async tapOneShotAlarm() {
        await this.click(await this.oneShotAlarmBtn)
    }

    async tapStartRepeatingAlarm() {
        await this.click(await this.startRepeatingAlarmBtn)
    }

    async tapStopRepeatingAlarm() {
        await this.click(await this.stopRepeatingAlarmBtn)
    }

    async getPageSourceText(): Promise<string> {
        await browser.pause(1000)
        return await driver.getPageSource()
    }
}

export default new AlarmControllerScreen()
