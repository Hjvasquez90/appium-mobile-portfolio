import { resetApp } from "../helpers/app.helper"
import HomeScreen from "../pageobjects/screens/home.screen"
import AnimationScreen from "../pageobjects/screens/animation.screen"
import ReversingScreen from "../pageobjects/screens/reversing.screen"

describe("ApiDemos - Reversing Animation Screen", () => {

    beforeEach(async () => {
        await resetApp()
        await HomeScreen.waitForHomeScreen()
        await HomeScreen.tapMenuItem("Animation")
        await AnimationScreen.waitForAnimationScreen()
        await AnimationScreen.tapAnimationItem("Reversing")
        await ReversingScreen.waitForScreen()
    })

    it("should display Play and Reverse buttons", async () => {
        expect(await (await ReversingScreen.playButton).isDisplayed()).toBe(true)
        expect(await (await ReversingScreen.reverseButton).isDisplayed()).toBe(true)
    })

    it("should keep Play button interactive after tapping it", async () => {
        await ReversingScreen.tapPlay()
        await ReversingScreen.waitForAnimation(3000)

        const isEnabled = await (await ReversingScreen.playButton).isEnabled()
        expect(isEnabled).toBe(true)
    })

    it("should keep Reverse button interactive after full play-reverse cycle", async () => {
        await ReversingScreen.tapPlay()
        await ReversingScreen.waitForAnimation(3000)

        await ReversingScreen.tapReverse()
        await ReversingScreen.waitForAnimation(3000)

        const isEnabled = await (await ReversingScreen.reverseButton).isEnabled()
        expect(isEnabled).toBe(true)
    })
})
