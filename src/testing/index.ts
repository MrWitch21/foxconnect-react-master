import { env } from '@/config/env'

const enableMocking = async () => {
  if (env.ENABLE_API_MOCKING) {
    const { worker } = await import('./browser')
    const { initializeDb } = await import('./db')
    await initializeDb()
    return worker.start()
  }
}

export { enableMocking }
