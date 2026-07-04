import { resetApp } from "../helpers/app.helper"
import HomeScreen from "../pageobjects/screens/home.screen"

describe("ApiDemos - Home Screen", () => {

    before(async () => {
        await resetApp()
    })

    it("should display the home screen correctly", async () => {
        await HomeScreen.waitForHomeScreen()
        const isDisplayed = await HomeScreen.menuList.isDisplayed()
        expect(isDisplayed).toBe(true)
    })

    it("should navigate to Animation menu", async () => {
        await resetApp()
        await HomeScreen.waitForHomeScreen()
        await HomeScreen.tapMenuItem("Animation")
        const animationItem = await $("android=new UiSelector().text(\"Bouncing Balls\")")
        expect(await animationItem.isDisplayed()).toBe(true)
    })
})
