import BaseScreen from "./base.screen"

class AlertDialogsScreen extends BaseScreen {

    get okCancelDialogBtn() {
        return $("android=new UiSelector().resourceId(\"io.appium.android.apis:id/two_buttons\")")
    }

    get ultraLongDialogBtn() {
        return $("android=new UiSelector().resourceId(\"io.appium.android.apis:id/two_buttons2ultra\")")
    }

    get listDialogBtn() {
        return $("android=new UiSelector().resourceId(\"io.appium.android.apis:id/select_button\")")
    }

    get textEntryDialogBtn() {
        return $("android=new UiSelector().resourceId(\"io.appium.android.apis:id/text_entry_button\")")
    }

    get dialogTitle() {
        return $("android=new UiSelector().resourceId(\"android:id/alertTitle\")")
    }

    get dialogOkBtn() {
        return $("android=new UiSelector().resourceId(\"android:id/button1\")")
    }

    get dialogCancelBtn() {
        return $("android=new UiSelector().resourceId(\"android:id/button2\")")
    }

    get dialogScrollView() {
        return $("android=new UiSelector().resourceId(\"android:id/scrollView\")")
    }

    get listDialogListView() {
        return $("android=new UiSelector().resourceId(\"android:id/select_dialog_listview\")")
    }

    get selectionMessage() {
        return $("android=new UiSelector().resourceId(\"android:id/message\")")
    }

    async getListDialogItem(text: string) {
        return $(`android=new UiSelector().text("${text}")`)
    }

    get usernameInput() {
        return $("android=new UiSelector().resourceId(\"io.appium.android.apis:id/username_edit\")")
    }

    get passwordInput() {
        return $("android=new UiSelector().resourceId(\"io.appium.android.apis:id/password_edit\")")
    }

    async waitForScreen() {
        await this.waitForDisplayed(await this.okCancelDialogBtn)
    }

    async openOkCancelDialog() {
        await this.click(await this.okCancelDialogBtn)
        await this.waitForDisplayed(await this.dialogTitle)
    }

    async openUltraLongDialog() {
        await this.click(await this.ultraLongDialogBtn)
        await this.waitForDisplayed(await this.dialogScrollView)
    }

    async openListDialog() {
        await this.click(await this.listDialogBtn)
        await this.waitForDisplayed(await this.listDialogListView)
    }

    async openTextEntryDialog() {
        await this.click(await this.textEntryDialogBtn)
        await this.waitForDisplayed(await this.usernameInput)
    }

    async getDialogTitle(): Promise<string> {
        return await this.getText(await this.dialogTitle)
    }

    async getSelectionMessage(): Promise<string> {
        const message = await this.selectionMessage
        await this.waitForDisplayed(message)
        return await message.getText()
    }

    async tapDialogOk() {
        await this.click(await this.dialogOkBtn)
    }

    async tapDialogCancel() {
        await this.click(await this.dialogCancelBtn)
    }

    async typeUsername(text: string) {
        const input = await this.usernameInput
        await this.waitForDisplayed(input)
        await input.setValue(text)
    }

    async typePassword(text: string) {
        const input = await this.passwordInput
        await this.waitForDisplayed(input)
        await input.setValue(text)
    }
}

export default new AlertDialogsScreen()
