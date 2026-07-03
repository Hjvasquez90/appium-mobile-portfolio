import { resetApp } from "../helpers/app.helper"
import HomeScreen from "../pageobjects/screens/home.screen"
import AnimationScreen from "../pageobjects/screens/animation.screen"
import HideShowAnimationsScreen from "../pageobjects/screens/hideShowAnimations.screen"

describe("ApiDemos - Hide-Show Animations Screen", () => {

    beforeEach(async () => {
        await resetApp()
        await HomeScreen.waitForHomeScreen()
        await HomeScreen.tapMenuItem("Animation")
        await AnimationScreen.waitForAnimationScreen()
        await AnimationScreen.tapAnimationItem("Hide-Show Animations")
        await HideShowAnimationsScreen.waitForScreen()
    })

    it("should display initial number buttons 0 to 3", async () => {
        const button0 = await HideShowAnimationsScreen.getNumberButton("0")
        const button3 = await HideShowAnimationsScreen.getNumberButton("3")

        expect(await button0.isDisplayed()).toBe(true)
        expect(await button3.isDisplayed()).toBe(true)
    })

    it("should hide a button when Hide (GONE) is checked and the button is tapped", async () => {
        await HideShowAnimationsScreen.tapHideGoneCheckbox()
        await HideShowAnimationsScreen.tapNumberButton("1")

        await HideShowAnimationsScreen.waitForButtonHidden("1")
        const isStillDisplayed = await HideShowAnimationsScreen.isButtonDisplayed("1")
        expect(isStillDisplayed).toBe(false)
    })

    it("should restore buttons to default state when tapping Show Buttons", async () => {
        await HideShowAnimationsScreen.tapHideGoneCheckbox()
        await HideShowAnimationsScreen.tapNumberButton("1")
        await HideShowAnimationsScreen.waitForButtonHidden("1")

        await HideShowAnimationsScreen.tapShowButtons()

        const button1 = await HideShowAnimationsScreen.getNumberButton("1")
        expect(await button1.isDisplayed()).toBe(true)
    })

    it("should toggle the Custom Animations checkbox", async () => {
        const initialState = await HideShowAnimationsScreen.isCustomAnimationsChecked()
        expect(initialState).toBe(false)

        await HideShowAnimationsScreen.tapCustomAnimationsCheckbox()

        const newState = await HideShowAnimationsScreen.isCustomAnimationsChecked()
        expect(newState).toBe(true)
    })
})
