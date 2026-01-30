---
title: Chrome & Chromium Installation
sidebar_position: 3
---

import DataLossWarning from '../../\_data-loss-warning.mdx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const ChromeLink = () => {
const {siteConfig} = useDocusaurusContext();
const {storeUrls} = siteConfig.customFields;
return <a href={storeUrls.chrome}>Chrome Web Store</a>;
};

# Chrome & Chromium Installation

### Method 1: Chrome Web Store (Recommended)

Install directly from the <ChromeLink /> for automatic updates.

### Method 2: Manual Installation (Developer Mode)

:::info key included in manifest
A key is included in the manifest primarily for ease of testing the Trello widget. The key makes the extension install with the same ID every time like it does on firefox, even when manually installing it.
:::

1. **Go to the [Releases page](https://github.com/BookCatKid/TablissNG/releases)**.
2. Download `tabliss-chromium.zip`.
3. Unzip the file into a folder on your computer.
4. Open Chrome and go to `chrome://extensions/`.
5. Enable **"Developer mode"** in the top right corner.
6. Click **"Load unpacked"**.
7. Select the folder where you unzipped the extension (ensure `manifest.json` is in the root of that folder).

<DataLossWarning />
