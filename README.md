# 📱 Mobile Test Automation Portfolio

![CI](https://github.com/Hjvasquez90/appium-mobile-portfolio/actions/workflows/mobile-tests.yml/badge.svg)

Automated mobile test suite for Android using **Appium v3**, **WebdriverIO**, and **TypeScript**, targeting the [ApiDemos](https://github.com/appium/appium/tree/master/packages/appium/sample-code/apps) demo application on a Pixel 6 emulator (Android 13).

> 🌐 **[Live Allure Report](https://hjvasquez90.github.io/appium-mobile-portfolio/)** — generated and deployed automatically on every push via GitHub Actions.
>
> 🖥️ **[Web Automation Portfolio](https://github.com/Hjvasquez90/playwright-web-automation)** — complementary portfolio using Playwright + TypeScript.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Appium | v3.x | Mobile automation server |
| WebdriverIO | v9.x | Test runner and client |
| TypeScript | v6.x | Language |
| Mocha | latest | Test framework |
| UIAutomator2 | v7.x | Android driver |
| Allure | v2.x | Test reporting |
| GitHub Actions | — | CI/CD pipeline |

---

## Project Structure

```
appium-mobile-portfolio/
├── .github/
│   └── workflows/
│       └── mobile-tests.yml      # CI/CD pipeline
├── apps/
│   └── ApiDemos-debug.apk        # Test target app (not committed)
├── test/
│   ├── helpers/
│   │   └── app.helper.ts         # Shared app reset utility
│   ├── pageobjects/
│   │   └── screens/
│   │       ├── base.screen.ts            # Base class with shared methods
│   │       ├── home.screen.ts
│   │       ├── animation.screen.ts
│   │       ├── hideShowAnimations.screen.ts
│   │       ├── reversing.screen.ts
│   │       ├── viewFlip.screen.ts
│   │       ├── alarmController.screen.ts
│   │       └── alertDialogs.screen.ts
│   └── specs/
│       ├── home.spec.ts
│       ├── animation.spec.ts
│       ├── hideShowAnimations.spec.ts
│       ├── reversing.spec.ts
│       ├── viewFlip.spec.ts
│       ├── alarmController.spec.ts
│       └── alertDialogs.spec.ts
├── wdio.conf.ts                  # WebdriverIO configuration
└── tsconfig.json
```

---

## Test Coverage

| Screen | Tests | Interactions Covered |
|---|---|---|
| Home | 2 | List display, navigation |
| Animation | 2 | List display, screen navigation |
| Hide-Show Animations | 4 | Checkboxes, button visibility, state reset |
| Reversing | 3 | Button states, animation cycle |
| View Flip | 4 | List flip, language switch, item tap |
| Alarm Controller | 4 | Toast messages, alarm scheduling |
| Alert Dialogs | 7 | OK/Cancel, list selection, text input, scroll |

**Total: 26 tests** across 7 screens. Active development — more screens and tests being added.

---

## Framework Architecture

### Page Object Model (POM)

Every screen extends a `BaseScreen` class that encapsulates shared interactions:

```typescript
export default class BaseScreen {
    async waitForDisplayed(locator: ChainablePromiseElement, timeout = 30000) {
        await locator.waitForDisplayed({ timeout })
    }
    async click(locator: ChainablePromiseElement) {
        await this.waitForDisplayed(locator)
        await locator.click()
    }
}
```

Each screen inherits these methods and adds its own locators and actions:

```typescript
class HomeScreen extends BaseScreen {
    get menuList() {
        return $('android=new UiSelector().className("android.widget.ListView")')
    }
    async tapMenuItem(text: string) {
        const item = await this.getMenuItem(text)
        await this.click(item)
    }
}
```

### Test Independence

Each spec resets the app state before every test using a shared helper:

```typescript
// test/helpers/app.helper.ts
export async function resetApp() {
    await driver.terminateApp("io.appium.android.apis")
    await driver.activateApp("io.appium.android.apis")
}
```

This ensures tests are fully independent and can run in any order.

---

## Key Technical Decisions

### Android UiSelector over XPath

All locators use `android=new UiSelector()` syntax consistently across the entire framework:

```typescript
// Consistent convention throughout the project
$('android=new UiSelector().resourceId("io.appium.android.apis:id/button")')
$('android=new UiSelector().text("Animation")')
$('android=new UiSelector().className("android.widget.ListView")')
```

XPath is avoided because it is fragile, slow, and breaks easily with UI changes.

### childSelector() for Ambiguous Elements

When `instance(N)` could match system UI elements (e.g. `navigationBarBackground`), the locator is anchored to a specific parent container:

```typescript
// Anchors search to a specific container — avoids matching system UI elements
$('android=new UiSelector().resourceId("io.appium.android.apis:id/container").childSelector(new UiSelector().className("android.view.View"))')
```

---

## Known Limitations & Workarounds

### Android 11+ Toast Detection

Android 11+ removed Toasts from the Accessibility Tree for security reasons. `UiAutomator2` cannot detect them as individual elements.

**Workaround:** `driver.getPageSource()` retrieves the raw XML of the current screen, which still includes Toast text even when it is not accessible as an element:

```typescript
// In alarmController.spec.ts
const pageSource = await driver.getPageSource()
expect(pageSource).toContain("One-shot alarm will go off in 30 seconds")
```

### Property Animator Positions

Android Property Animators (`translationY`) move elements visually without updating their position in the Accessibility Tree. `getLocation()` always returns the original coordinates regardless of the animation state.

**Workaround:** Instead of verifying position, verify that interactive elements remain enabled and functional throughout the animation cycle.

---

## Running Locally

### Prerequisites

| Tool | Version |
|---|---|
| Node.js | 22+ |
| Java JDK | 17 (Temurin) |
| Android Studio | Latest |
| Appium | v3.x (`npm install -g appium`) |
| UIAutomator2 driver | `appium driver install uiautomator2` |

### Setup

```bash
# Clone the repository
git clone https://github.com/Hjvasquez90/appium-mobile-portfolio.git
cd appium-mobile-portfolio

# Install dependencies
npm install

# Download the test app
# Place ApiDemos-debug.apk inside the /apps folder
# Download from: https://github.com/appium/appium/raw/master/packages/appium/sample-code/apps/ApiDemos-debug.apk
```

### Environment Variables

```
ANDROID_HOME = C:\Users\<user>\AppData\Local\Android\Sdk
JAVA_HOME    = C:\...\jdk-17
PATH         += %ANDROID_HOME%\platform-tools
PATH         += %ANDROID_HOME%\emulator
```

### Run All Tests

```bash
# Start the Android emulator first
emulator -avd Pixel_6

# Run the full test suite
npm run wdio
```

### Run a Single Spec

```bash
npx wdio run ./wdio.conf.ts --spec=test/specs/home.spec.ts
```

### View the Allure Report

```bash
npm install -g allure-commandline
allure serve allure-results
```

---

## CI/CD Pipeline

The pipeline runs automatically on every push to `main`:

```
Push to main
    ↓
Ubuntu runner spins up
    ↓
Node 22 + Java 17 + Android SDK installed
    ↓
Appium + UIAutomator2 installed
    ↓
ApiDemos APK downloaded
    ↓
Android emulator created (API 29, Pixel 6 profile)
    ↓
UIAutomator2 server pre-installed on emulator
    ↓
Full test suite runs
    ↓
Allure report generated + deployed to GitHub Pages
```

> The UIAutomator2 server is pre-installed manually before the test run to prevent parallel installation conflicts across multiple workers.

---

## Roadmap

- [ ] Add more screens: Views, Text, Graphics sections
- [ ] Add visual regression tests with WebdriverIO Visual Testing
- [ ] Add iOS test configuration (BrowserStack or GitHub Actions macOS runner)
- [ ] Integrate Slack notifications for CI results

---

## Author

**Hawk Vasquez** — QA Automation Engineer
- 📧 Available on LinkedIn
- 🖥️ [Web Automation Portfolio](https://github.com/Hjvasquez90/playwright-web-automation)
