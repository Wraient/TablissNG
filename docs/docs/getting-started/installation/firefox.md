---
title: Firefox Installation
sidebar_position: 2
---

import DataLossWarning from "../../\_data-loss-warning.mdx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export const FirefoxLink = () => {
const { siteConfig } = useDocusaurusContext();
const { storeUrls } = siteConfig.customFields;
return <a href={storeUrls.firefox}>Firefox Add-ons store</a>;
};

# Firefox Installation

### Method 1: Firefox Add-ons (Recommended)

Install directly from the <FirefoxLink /> for automatic updates.

### Method 2: Manual Installation (.xpi)

:::tip Nightly Signed Build
For the latest experimental features, you can install the **Signed Nightly** build. This version is signed by Mozilla and will work on standard Firefox releases.

<div style={{ marginBottom: "1rem" }}>
  <a href="https://github.com/BookCatKid/TablissNG/releases/download/nightly-auto/tablissng-1.6.1.3.xpi" className="button button--primary button--sm">Install Signed Nightly</a>
</div>

_(Current version: `v1.6.1.2`)_
:::

1. **Go to the [Releases page](https://github.com/BookCatKid/TablissNG/releases)**.
2. Find the latest release (or `nightly-auto` for the latest features).
3. Download the `.xpi` file:
   - For Nightly: `tablissng-X.X.X.X.xpi`
   - For Stable: `tabliss-firefox-signed.xpi`
4. In Firefox, go to `about:addons`.
5. Click the gear icon (⚙️) and select **"Install Add-on from File..."**.
6. Select the downloaded `.xpi` file.

### Method 3: Temporary Installation (Standard Firefox)

If you are using a standard version of Firefox and want to test a build without permanent installation:

1. Open Firefox and type `about:debugging` in the address bar.
2. Click **"This Firefox"** in the sidebar.
3. Click **"Load Temporary Add-on..."**.
4. Select the `.zip` or `.xpi` file.

_Note: The extension will be removed when you restart Firefox._

### Method 4: Permanent Unsigned (Dev Edition & Forks)

Firefox Developer Edition, Nightly, and many forks (like Zen) allow you to bypass signature requirements permanently:

1. Type `about:config` in the address bar and click "Accept the Risk and Continue".
2. Search for `xpinstall.signatures.required`.
3. Double-click the preference to set it to `false`.
4. You can now install unsigned `.xpi` files via **Method 2** and they will remain installed after a restart.

<DataLossWarning />

#### How to Update

Standard installations via the **Firefox Add-ons store** update automatically.

To force an update check:

1. Open Firefox and go to `about:addons`.
2. Click the **gear icon (⚙️)** in the top right.
3. Select **"Check for Updates"**.
4. Firefox will check for updates using the `update_url` specified in the extension's manifest.
