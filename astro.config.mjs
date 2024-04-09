import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import * as dotenv from 'dotenv'
import vercel from '@astrojs/vercel/serverless'

dotenv.config()

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  output: 'server',
  adapter: vercel()
})
