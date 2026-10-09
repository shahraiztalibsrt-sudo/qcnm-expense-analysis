# QCNM Expense Analysis — GitHub Pages PWA

## Files
- `index.html` — your dashboard, updated for automatic workbook loading and saved offline data
- `data.xlsx` — **you add your workbook and rename it exactly this**
- `manifest.webmanifest`, `sw.js`, `icon.svg` — installable/offline PWA support

## Publish it (beginner steps)
1. Sign in at https://github.com and click **+ → New repository**.
2. Give it a name such as `qcnm-expense-analysis`.
3. **Privacy warning:** anything committed to a public repository—including `data.xlsx`—can be downloaded by anyone. If this workbook contains clinic, patient, employee, or financial confidential data, do not upload it to a public repository. Use an approved private hosting/data arrangement instead.
4. Add/upload all files in this folder to the repository root. Upload your Excel workbook as `data.xlsx` (same folder as `index.html`). You can replace `icon.svg` with your own app logo and update the manifest icon paths if using PNG files.
5. Open repository **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select **main** and **/(root)**, then **Save**.
6. Wait for GitHub Pages to publish, then open the URL shown on the Pages settings screen. It normally looks like `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.
7. Open the site while online once so the app and workbook can be cached. On your phone, open the site in Chrome (Android) or Safari (iPhone), then use **Add to Home Screen** / **Install app**.
8. Test offline by opening it once online, then enable airplane mode and reopen it from the home-screen icon.

## How data works
- On each app start, the dashboard restores its last successfully parsed data from that browser's local storage, then tries to fetch `data.xlsx` for the latest workbook.
- New data is saved locally in that browser after loading. Different phones/browsers have separate offline copies.
- Replacing `data.xlsx` in GitHub makes the new workbook available online. Each device updates when it next opens while online.
- Offline mode cannot fetch workbook updates; it uses that device's saved data.
- The app's service worker caches the app shell and the workbook after a successful online fetch. Browser storage can be cleared/evicted by the device, so offline storage is not an absolute permanent backup.
