const { test, expect } = require('@playwright/test')

test('agent chat canonical state', async ({ page }) => {
  await page.goto('/agent-chat')
  await page.locator('[data-testid="agent-chat-region"]').waitFor()
  await page.waitForFunction(() => document.fonts.status === 'loaded')
  await expect(page.locator('[data-testid="agent-chat-region"]')).toHaveScreenshot('agent-chat.png')
})

test('Blueprint details canonical state', async ({ page }) => {
  await page.goto('/blueprints/endpoint-investigation')
  await page.locator('[data-testid="blueprint-details-region"]').waitFor()
  await page.waitForFunction(() => document.fonts.status === 'loaded')
  await expect(page.locator('[data-testid="blueprint-details-region"]')).toHaveScreenshot(
    'blueprint-details.png',
  )
})
