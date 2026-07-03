export async function resetApp() {
    const appId = "io.appium.android.apis"
    await driver.terminateApp(appId)
    await driver.activateApp(appId)
}
