# Overview
You will be installing, and configuring two Chrome extensions to help with filling out and downloading Coggins forms on the USDA VSPS Website

# Step 1 - Install Chrome Extensions
**Step 1a: Install Extension - Tampermonkey**

> https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en

**Step 1b: Install Extension - No PDF Download**

> https://chrome.google.com/webstore/detail/no-pdf-download/ikhahkidgnljlniknmendeflkdlfhonj?hl=en


# Step 2 - Configure Tampermonkey
**Step 2a: Open Tampermonkey Options**

![Step2a](/step3.png)

**Step 2b: Set External Scripts to Always Reload**

![Step2b](/Step4.png)

**Step 2c: Add New User Script**

![Step2b](/Step5.png)

**Step 2d: Open the following link, copy the contents, and paste it into the Script Editor**
> https://raw.githubusercontent.com/foundationequine/coggins/main/tampermonkey-script.js

**Step 2d: Save script**

![Step2b](/Step6.png)

# Installation Complete
You can now go to the USPS Website and work with Coggins. The script will auto select the state, license, and automatically create download links for the Coggins PDFs when appropriate.
