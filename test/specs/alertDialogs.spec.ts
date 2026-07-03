import { resetApp } from "../helpers/app.helper"
import HomeScreen from "../pageobjects/screens/home.screen"
import AlertDialogsScreen from "../pageobjects/screens/alertDialogs.screen"

describe("ApiDemos - Alert Dialogs Screen", () => {

    beforeEach(async () => {
        await resetApp()
        await HomeScreen.waitForHomeScreen()
        await HomeScreen.tapMenuItem("App")
        const alertDialogsItem = await $("android=new UiSelector().text(\"Alert Dialogs\")")
        await alertDialogsItem.waitForDisplayed({ timeout: 5000 })
        await alertDialogsItem.click()
        await AlertDialogsScreen.waitForScreen()
    })

    it("should display OK Cancel dialog with correct title", async () => {
        await AlertDialogsScreen.openOkCancelDialog()
        const title = await AlertDialogsScreen.getDialogTitle()
        expect(title).toContain("Lorem ipsum")
    })

    it("should dismiss OK Cancel dialog when tapping Cancel", async () => {
        await AlertDialogsScreen.openOkCancelDialog()
        await AlertDialogsScreen.tapDialogCancel()
        expect(await (await AlertDialogsScreen.okCancelDialogBtn).isDisplayed()).toBe(true)
    })

    it("should dismiss OK Cancel dialog when tapping OK", async () => {
        await AlertDialogsScreen.openOkCancelDialog()
        await AlertDialogsScreen.tapDialogOk()
        expect(await (await AlertDialogsScreen.okCancelDialogBtn).isDisplayed()).toBe(true)
    })

    it("should display scrollable content in ultra long message dialog", async () => {
        await AlertDialogsScreen.openUltraLongDialog()
        const scrollView = await AlertDialogsScreen.dialogScrollView
        expect(await scrollView.isDisplayed()).toBe(true)
        const isScrollable = await scrollView.getAttribute("scrollable")
        expect(isScrollable).toBe("true")
    })

    it("should display List dialog with correct items", async () => {
        await AlertDialogsScreen.openListDialog()
        const commandOne = await AlertDialogsScreen.getListDialogItem("Command one")
        expect(await commandOne.isDisplayed()).toBe(true)
        const commandFour = await AlertDialogsScreen.getListDialogItem("Command four")
        expect(await commandFour.isDisplayed()).toBe(true)
    })

    it("should show selection message after selecting item from List dialog", async () => {
        await AlertDialogsScreen.openListDialog()
        const item = await AlertDialogsScreen.getListDialogItem("Command two")
        await item.click()

        const message = await AlertDialogsScreen.getSelectionMessage()
        expect(message).toContain("Command two")
    })

    it("should accept text input in Text Entry dialog", async () => {
        await AlertDialogsScreen.openTextEntryDialog()
        await AlertDialogsScreen.typeUsername("testuser")
        await AlertDialogsScreen.typePassword("password123")
        const usernameText = await (await AlertDialogsScreen.usernameInput).getText()
        expect(usernameText).toBe("testuser")
        await AlertDialogsScreen.tapDialogOk()
        expect(await (await AlertDialogsScreen.textEntryDialogBtn).isDisplayed()).toBe(true)
    })
})
