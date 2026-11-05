---
title: Playwright screenshot regression tests
tags:
  - playwright
  - screenshot
  - visual-regression
  - baseline
  - chromium
  - github-actions
  - pull-request
  - material-ui
---

The screenshot-regression mechanism renders fixture-only React surfaces from the repository root.

## Why

Committed baselines make approved visual presentation reviewable with the source change that produced it. Pull-request comparisons reject unexpected pixel changes without accepting a replacement baseline automatically.

## Behavior

* The **visual suite** starts the Create React App development server and captures the two protected application regions in Chromium.
* The **fixture data** in `src/fixtures.js` supplies every visible value, so screenshots require no service, credential, or tenant data.
* The **normal command** reads committed images from `e2e/snapshots/` and fails when a rendered region differs.
* The **update command** uses Playwright's explicit update flag to write candidate baselines for review and commit.
* The **pull-request workflow** runs only the comparison command and publishes the expected, actual, difference, trace, and report data when it fails.
* The **manual workflow** generates candidate images on GitHub Linux for the initial baseline and intentional source-branch updates.

## Invariants

* The **comparison command** must never include Playwright's snapshot-update flag.
* The **baseline workflow** must remain manually dispatched and must not write to GitHub repository contents.
* The **initial scope** uses one fixed desktop Chromium project and locator screenshots rather than full-page screenshots.
* The **baseline environment** is GitHub Actions Ubuntu, because rendering baselines and comparisons on the same platform limits font and browser variation.

## Modules

| Concern                     | Path                                            |
| --------------------------- | ----------------------------------------------- |
| Fixture application         | `src/App.js` and `src/fixtures.js`              |
| Playwright contract         | `playwright.config.js` and `e2e/visual.spec.js` |
| Approved image files        | `e2e/snapshots/`                                |
| Pull-request comparison     | `.github/workflows/visual-regression.yml`       |
| Manual candidate generation | `.github/workflows/generate-baselines.yml`      |

## Failure diagnostics

* A **comparison failure** leaves the committed baseline unchanged and uploads `visual-regression-diagnostics` for fourteen days.
* The **diagnostic artifact** contains the approved image directory, Playwright report, actual screenshot, difference image, and trace data when Playwright produced them.

## Change guide

* Update a **protected surface** with `yarn visual:update` only after deciding the visual change is intentional.
* Generate a **reviewable baseline** from the source branch through the manual GitHub workflow, then download and commit its artifact with the UI source change.
* Add a **new capture** by extending `e2e/visual.spec.js`, preserving fixed data, fixed viewport settings, and a stable application-region locator.

## Limits

* The **suite** does not exercise network behavior, authentication, accessibility, mobile layouts, or non-Chromium browsers.

## Links

* Playwright documents the **screenshot update and comparison contract** at https://playwright.dev/docs/test-snapshots.
