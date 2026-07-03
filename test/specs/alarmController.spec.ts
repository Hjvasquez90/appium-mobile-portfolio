import { resetApp } from "../helpers/app.helper"
import HomeScreen from "../pageobjects/screens/home.screen"
import AlarmControllerScreen from "../pageobjects/screens/alarmController.screen"

describe("ApiDemos - Alarm Controller Screen", () => {

    beforeEach(async () => {
        await resetApp()
        await HomeScreen.waitForHomeScreen()
        await HomeScreen.tapMenuItem("App")
        const appItem = await $("android=new UiSelector().text(\"Alarm\")")
        await appItem.waitForDisplayed({ timeout: 5000 })
        await appItem.click()
        const alarmItem = await $("android=new UiSelector().text(\"Alarm Controller\")")
        await alarmItem.waitForDisplayed({ timeout: 5000 })
        await alarmItem.click()
        await AlarmControllerScreen.waitForScreen()
    })

    it("should display all alarm buttons", async () => {
        expect(await (await AlarmControllerScreen.oneShotAlarmBtn).isDisplayed()).toBe(true)
        expect(await (await AlarmControllerScreen.startRepeatingAlarmBtn).isDisplayed()).toBe(true)
        expect(await (await AlarmControllerScreen.stopRepeatingAlarmBtn).isDisplayed()).toBe(true)
    })

    it("should show toast when tapping One Shot Alarm", async () => {
        await AlarmControllerScreen.tapOneShotAlarm()

        const pageSource = await AlarmControllerScreen.getPageSourceText()
        expect(pageSource).toContain("One-shot alarm will go off in 30 seconds")
    })

    it("should show toast when tapping Start Repeating Alarm", async () => {
        await AlarmControllerScreen.tapStartRepeatingAlarm()

        const pageSource = await AlarmControllerScreen.getPageSourceText()
        expect(pageSource).toContain("Repeating alarm will go off in 15 seconds")
    })

    it("should show toast when stopping repeating alarm", async () => {
        await AlarmControllerScreen.tapStartRepeatingAlarm()
        await browser.pause(2000)

        await AlarmControllerScreen.tapStopRepeatingAlarm()

        const pageSource = await AlarmControllerScreen.getPageSourceText()
        expect(pageSource).toContain("Repeating alarm has been unscheduled")
    })
})
