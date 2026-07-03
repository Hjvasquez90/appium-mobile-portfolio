# Proyecto: Mobile QA Portfolio con Appium

## Stack
- WebdriverIO + TypeScript + Mocha
- Appium + UIAutomator2 driver
- App de pruebas: ApiDemos-debug.apk (Android)
- Reportes: Allure
- Emulador: Pixel_6 (Android 13, API 33)

## Arquitectura - Page Object Model
- test/pageobjects/screens/base.screen.ts -> clase padre con metodos comunes (click, waitForDisplayed, getText)
- test/pageobjects/screens/*.screen.ts -> cada pantalla extiende BaseScreen
- test/specs/*.spec.ts -> los tests

## Convenciones
- Tipos de locator: ChainablePromiseElement (no WebdriverIO.Element)
- Cada Screen exporta una instancia: export default new XScreen()
- tsconfig.json usa moduleResolution node + ignoreDeprecations 6.0
- Los locators vienen de Appium Inspector (UiSelector de Android)

## Estado actual
- HomeScreen y su test funcionando
- AnimationScreen recien creado, falta su test

