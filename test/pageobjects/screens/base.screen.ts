export default class BaseScreen {

    async waitForDisplayed(locator: ChainablePromiseElement, timeout = 30000) {
        await locator.waitForDisplayed({ timeout })
    }

    async click(locator: ChainablePromiseElement) {
        await this.waitForDisplayed(locator)
        await locator.click()
    }

    async getText(locator: ChainablePromiseElement): Promise<string> {
        await this.waitForDisplayed(locator)
        return await locator.getText()
    }
}
