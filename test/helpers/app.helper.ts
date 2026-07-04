export async function resetApp() {
    const appId = "io.appium.android.apis"
    await driver.terminateApp(appId)
    await browser.pause(2000)
    await driver.activateApp(appId)
    await browser.pause(3000)
}
