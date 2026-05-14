import { defineConfig, devices } from '@playwright/test';
import { config as loadEnv } from 'dotenv';

// .env.local 의 NEXTAUTH_SECRET 등을 테스트 프로세스에서도 쓸 수 있게 로드.
loadEnv({ path: '.env.local' });
loadEnv({ path: '.env' });

// Playwright E2E 설정.
// - testDir: tests/e2e 안의 .spec.ts 만 실행.
// - webServer: 테스트 실행 전 dev 서버를 자동으로 띄움. 이미 돌고 있으면 재사용.
// - baseURL: 테스트가 page.goto('/...') 로 호출할 때 기준.
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
