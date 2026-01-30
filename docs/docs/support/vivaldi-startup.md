---
title: Vivaldi Startup Issue
sidebar_position: 3
---

# Empty Start Page in Vivaldi

Some Vivaldi users may experience an empty page when starting the browser, even though TablissNG works correctly on new tabs.

### The Problem
This is a known issue (GitHub [#92](https://github.com/BookCatKid/TablissNG/issues/92)) specifically affecting how Vivaldi handles extension-controlled start pages on initial launch.

### The Solution (Workaround)
To fix this, you can manually set your homepage to the TablissNG extension page:

1. Open Vivaldi **Settings**.
2. Go to **General** > **Homepage**.
3. Select **Specific Page**.
4. Enter the following URL:
   `chrome-extension://dlaogejjiafeobgofajdlkkhjlignalk/index.html`

   <img src="/TablissNG/docs/img/screenshots/support/vivaldi_settings.png" alt="Vivaldi Settings Example" width="600" />

5. Under **Startup with**, ensure it is set to **Homepage**.

Now, when you start Vivaldi or click the Home button, TablissNG will load correctly.
