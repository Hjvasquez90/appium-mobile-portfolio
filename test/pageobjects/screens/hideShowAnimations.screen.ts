import BaseScreen from "./base.screen"

class HideShowAnimationsScreen extends BaseScreen {

    get showButtonsBtn() {
        return $("android=new UiSelector().resourceId(\"io.appium.android.apis:id/addNewButton\")")
    }

    get customAnimationsCheckbox() {
        return $("android=new UiSelector().resourceId(\"io.appium.android.apis:id/customAnimCB\")")
    }

    get hideGoneCheckbox() {
        return $("android=new UiSelector().resourceId(\"io.appium.android.apis:id/hideGoneCB\")")
    }

    async getNumberButton(number: string) {
        return $(`android=new UiSelector().text("${number}")`)
    }

    async waitForScreen() {
        await this.waitForDisplayed(await this.showButtonsBtn)
    }

    async tapShowButtons() {
        await this.click(await this.showButtonsBtn)
    }

    async tapCustomAnimationsCheckbox() {
        await this.click(await this.customAnimationsCheckbox)
    }

    async tapHideGoneCheckbox() {
        await this.click(await this.hideGoneCheckbox)
    }

    async isCustomAnimationsChecked(): Promise<boolean> {
        const checkbox = await this.customAnimationsCheckbox
        await this.waitForDisplayed(checkbox)
        const checked = await checkbox.getAttribute("checked")
        return checked === "true"
    }

    async tapNumberButton(number: string) {
        const button = await this.getNumberButton(number)
        await this.click(button)
    }

    async isButtonDisplayed(number: string): Promise<boolean> {
        const button = await this.getNumberButton(number)
        return await button.isDisplayed()
    }

    async waitForButtonHidden(number: string, timeout = 10000) {
        const button = await this.getNumberButton(number)
        await button.waitForDisplayed({ timeout, reverse: true })
    }
}

export default new HideShowAnimationsScreen()
