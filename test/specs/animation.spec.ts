import { resetApp } from "../helpers/app.helper"
import HomeScreen from "../pageobjects/screens/home.screen"
import AnimationScreen from "../pageobjects/screens/animation.screen"

describe("ApiDemos - Animation Screen", () => {

    beforeEach(async () => {
        await resetApp()
        await HomeScreen.waitForHomeScreen()
        await HomeScreen.tapMenuItem("Animation")
        await AnimationScreen.waitForAnimationScreen()
    })

    it("should navigate to Animation screen and display the list", async () => {
        const isDisplayed = await AnimationScreen.animationList.isDisplayed()
        expect(isDisplayed).toBe(true)
    })

    it("should open Bouncing Balls animation", async () => {
        await AnimationScreen.tapAnimationItem("Bouncing Balls")
        const canvas = await $("android=new UiSelector().resourceId(\"io.appium.android.apis:id/container\")")
        expect(await canvas.isDisplayed()).toBe(true)
    })
})
