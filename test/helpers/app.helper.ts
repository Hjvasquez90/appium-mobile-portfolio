export async function resetApp() {
    await driver.terminateApp("io.appium.android.apis")
    await browser.pause(1000)
    await driver.activateApp("io.appium.android.apis")
}
