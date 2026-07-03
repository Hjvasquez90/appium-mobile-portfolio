import BaseScreen from "./base.screen"

class ReversingScreen extends BaseScreen {

    get playButton() {
        return $("android=new UiSelector().resourceId(\"io.appium.android.apis:id/startButton\")")
    }

    get reverseButton() {
        return $("android=new UiSelector().resourceId(\"io.appium.android.apis:id/reverseButton\")")
    }

    get ball() {
        return $("android=new UiSelector().resourceId(\"io.appium.android.apis:id/container\").childSelector(new UiSelector().className(\"android.view.View\"))")
    }

    async waitForScreen() {
        await this.waitForDisplayed(await this.playButton)
    }

    async tapPlay() {
        await this.click(await this.playButton)
    }

    async tapReverse() {
        await this.click(await this.reverseButton)
    }

    async getBallPosition() {
        const ball = await this.ball
        await this.waitForDisplayed(ball)
        return await ball.getLocation()
    }

    async waitForAnimation(ms = 2000) {
        await browser.pause(ms)
    }
}

export default new ReversingScreen()
