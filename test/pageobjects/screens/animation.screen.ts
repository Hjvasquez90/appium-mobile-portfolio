import BaseScreen from "./base.screen"

class AnimationScreen extends BaseScreen {

    get animationList() {
        return $("android=new UiSelector().resourceId(\"android:id/list\")")
    }

    async getAnimationItem(text: string) {
        return $(`android=new UiSelector().text("${text}")`)
    }

    async waitForAnimationScreen() {
        await this.waitForDisplayed(await this.animationList)
    }

    async tapAnimationItem(text: string) {
        const item = await this.getAnimationItem(text)
        await this.click(item)
    }
}

export default new AnimationScreen()
