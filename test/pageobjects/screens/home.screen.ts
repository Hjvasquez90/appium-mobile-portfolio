import BaseScreen from "./base.screen"
class HomeScreen extends BaseScreen {
    get menuList() {
        return $("android=new UiSelector().className(\"android.widget.ListView\")")
    }
    async getMenuItem(text: string) {
        return $(`android=new UiSelector().text("${text}")`)
    }
    async waitForHomeScreen() {
        await this.waitForDisplayed(await this.menuList)
    }
    async tapMenuItem(text: string) {
        const item = await this.getMenuItem(text)
        await this.click(item)
    }
}
export default new HomeScreen()
