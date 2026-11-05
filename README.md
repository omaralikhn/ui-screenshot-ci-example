# UI screenshot CI example

This private teaching repository demonstrates a React 17, Material UI 5, Create React App, `react-app-rewired`, Yarn Classic, and Playwright screenshot-regression workflow. It uses static local fixtures only. It contains no live
services,
credentials, tenant data, or proprietary source.

## Why

Committed screenshot baselines make the approved presentation reviewable in version control. Pull-request CI compares two deterministic Chromium renders with the committed images, so a visible regression fails before merge.

## Canonical captures

* The **agent chat** shows expanded reasoning, an expanded tool, a collapsed tool, and a visible investigation plan.
* The **Blueprint details** page shows a stable route-level details surface.

## Commands

```bash
yarn install --frozen-lockfile
yarn playwright install chromium
yarn visual
yarn visual:update
yarn check
```

* `yarn visual` **compares** the current render with committed baselines and never writes a baseline.
* `yarn visual:update` deliberately **generates candidate baselines** from the current render.
* `yarn check` **builds the application** and runs the normal comparison command.

## Baseline governance

GitHub Actions owns the baseline-rendering environment: Ubuntu 24.04 and the Chromium version locked by `yarn.lock`. Generate the initial or intentional baseline candidates with the manual **Generate visual baselines** workflow on the
source branch, download its `visual-baselines` artifact, review the PNG changes, and commit them with the visible source change.

A baseline update is an approval of a user-visible presentation change. Never run `yarn visual:update` in the pull-request workflow, and never commit a baseline to hide an unexplained regression.

## Pull-request demonstrations

| Pull request                      | Expected result                         | Lesson                                                               |
| --------------------------------- | --------------------------------------- | -------------------------------------------------------------------- |
| Green non-visual change           | Passes without a baseline update.       | Non-pixel-affecting code can change safely.                          |
| Red CSS-only visual regression    | Fails without a baseline update.        | CSS regressions cannot merge silently.                               |
| Red markup-only visual regression | Fails without a baseline update.        | Markup regressions cannot merge silently.                            |
| Green intentional visual update   | Passes with a reviewed baseline update. | Intentional visual changes need source and baseline review together. |

## CI diagnostics

A failed visual comparison uploads the committed expected images, Playwright actual images, difference images, traces, and HTML report as the `visual-regression-diagnostics` artifact for 14 days.

## Limits

The initial suite protects two desktop Chromium captures. It does not replace behavioral, accessibility, API, authentication, mobile, cross-browser, or production-environment tests.
