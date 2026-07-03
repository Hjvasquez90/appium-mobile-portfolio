import BaseScreen from "./base.screen"

class ViewFlipScreen extends BaseScreen {

    get flipButton() {
        return $("android=new UiSelector().resourceId(\"io.appium.android.apis:id/button\")")
    }

    get englishList() {
        return $("android=new UiSelector().resourceId(\"io.appium.android.apis:id/list_en\")")
    }

    get frenchList() {
        return $("android=new UiSelector().resourceId(\"io.appium.android.apis:id/list_fr\")")
    }

    async getListItem(text: string) {
        return $(`android=new UiSelector().text("${text}")`)
    }

    async waitForScreen() {
        await this.waitForDisplayed(await this.flipButton)
    }

    async tapFlip() {
        await this.click(await this.flipButton)
    }

    async tapItem(text: string) {
        const item = await this.getListItem(text)
        await this.click(item)
    }

    async waitForAnimation(ms = 2000) {
        await browser.pause(ms)
    }
}

export default new ViewFlipScreen()
