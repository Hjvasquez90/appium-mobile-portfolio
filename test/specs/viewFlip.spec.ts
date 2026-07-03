import { resetApp } from "../helpers/app.helper"
import HomeScreen from "../pageobjects/screens/home.screen"
import AnimationScreen from "../pageobjects/screens/animation.screen"
import ViewFlipScreen from "../pageobjects/screens/viewFlip.screen"

describe("ApiDemos - View Flip Animation Screen", () => {

    beforeEach(async () => {
        await resetApp()
        await HomeScreen.waitForHomeScreen()
        await HomeScreen.tapMenuItem("Animation")
        await AnimationScreen.waitForAnimationScreen()
        await AnimationScreen.tapAnimationItem("View Flip")
        await ViewFlipScreen.waitForScreen()
    })

    it("should display English list with correct items initially", async () => {
        expect(await (await ViewFlipScreen.englishList).isDisplayed()).toBe(true)

        const itemOne = await ViewFlipScreen.getListItem("One")
        expect(await itemOne.isDisplayed()).toBe(true)
    })

    it("should flip to French list when tapping Flip button", async () => {
        await ViewFlipScreen.tapFlip()
        await ViewFlipScreen.waitForAnimation(2000)

        expect(await (await ViewFlipScreen.frenchList).isDisplayed()).toBe(true)

        const itemUn = await ViewFlipScreen.getListItem("Un")
        expect(await itemUn.isDisplayed()).toBe(true)
    })

    it("should flip back to English list when tapping Flip again", async () => {
        await ViewFlipScreen.tapFlip()
        await ViewFlipScreen.waitForAnimation(2000)

        await ViewFlipScreen.tapFlip()
        await ViewFlipScreen.waitForAnimation(2000)

        expect(await (await ViewFlipScreen.englishList).isDisplayed()).toBe(true)

        const itemOne = await ViewFlipScreen.getListItem("One")
        expect(await itemOne.isDisplayed()).toBe(true)
    })

    it("should highlight an item when tapped", async () => {
        await ViewFlipScreen.tapItem("Three")

        const item = await ViewFlipScreen.getListItem("Three")
        expect(await item.isEnabled()).toBe(true)
    })
})
