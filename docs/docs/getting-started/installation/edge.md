---
title: Microsoft Edge Installation
sidebar_position: 4
---

import DataLossWarning from '../../\_data-loss-warning.mdx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const EdgeLink = () => {
const {siteConfig} = useDocusaurusContext();
const {storeUrls} = siteConfig.customFields;
return <a href={storeUrls.edge}>Microsoft Edge Add-ons store</a>;
};

# Microsoft Edge Installation

### Method 1: Edge Add-ons (Recommended)

Install directly from the <EdgeLink /> for automatic updates.

### Method 2: Manual Installation

1. **Go to the [Releases page](https://github.com/BookCatKid/TablissNG/releases)**.
2. Download `tabliss-chromium.zip`.
3. Unzip the file into a folder.
4. Open Edge and go to `edge://extensions/`.
5. Enable **"Developer mode"** (usually in the bottom left or under a sidebar).
6. Click **"Load unpacked"**.
7. Select the unzipped folder.

<DataLossWarning />

#### How to Update

Standard installations via the **Microsoft Edge Add-ons store** update automatically.

To force an update check:

1. Open Edge and go to `edge://extensions/`.
2. Ensure **Developer mode** is enabled (toggle in the sidebar or bottom left).
3. Click the **Update** button in the top toolbar.
4. This will trigger an update check for all sideloaded extensions.
