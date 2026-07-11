import { spawn } from 'node:child_process'
import { chromium } from 'playwright'

const baseUrl = 'http://localhost:3000'
const server = spawn('pnpm', ['dev'], {
  detached: true,
  stdio: ['ignore', 'pipe', 'pipe'],
})

let serverOutput = ''
server.stdout.on('data', chunk => { serverOutput += chunk })
server.stderr.on('data', chunk => { serverOutput += chunk })

const waitForServer = async () => {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(baseUrl)
      if (response.ok) return
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 250))
  }
  throw new Error(`文档服务启动超时\n${serverOutput}`)
}

let browser

const stopServer = () => {
  try {
    process.kill(-server.pid, 'SIGTERM')
  } catch {}
}

try {
  await waitForServer()
  console.log('docs server ok')
  browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  page.setDefaultTimeout(15_000)
  const errors = []

  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text())
  })

  for (const route of ['/', '/guide/getting-started', '/demo/']) {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' })
    if (!response?.ok()) throw new Error(`${route} 返回 ${response?.status()}`)
    console.log(`${route} ok`)
  }

  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(() => document.body.innerText.trim().length > 0)
  const homeText = await page.locator('body').innerText()
  if (!homeText.includes('0.3.11')) {
    throw new Error(`首页未显示版本号。页面内容：\n${homeText.slice(0, 500)}\n浏览器异常：\n${errors.join('\n')}`)
  }
  await page.locator('canvas').first().waitFor({ state: 'visible', timeout: 15_000 })

  await page.goto(`${baseUrl}/demo/`, { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(() => document.body.innerText.trim().length > 0)
  await page.locator('canvas').first().waitFor({ state: 'visible', timeout: 15_000 })

  if (errors.length > 0) throw new Error(`浏览器控制台异常：\n${errors.join('\n')}`)
  console.log('browser smoke ok')
} finally {
  await browser?.close()
  stopServer()
}
