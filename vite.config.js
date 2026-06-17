import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

function getHtmlFiles() {
  return fs.readdirSync(__dirname)
    .filter(f => f.endsWith('.html') && f !== 'index.html')
    .sort()
}

function pagesJsonPlugin() {
  return {
    name: 'pages-json',
    configureServer(server) {
      server.middlewares.use('/pages.json', (_req, res) => {
        const pages = getHtmlFiles().map(f => ({ path: f, name: f.replace('.html', '') }))
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(pages))
      })
    },
    closeBundle() {
      const pages = getHtmlFiles().map(f => ({ path: f, name: f.replace('.html', '') }))
      fs.writeFileSync(path.join(__dirname, 'dist/pages.json'), JSON.stringify(pages))
    }
  }
}

const htmlFiles = getHtmlFiles()

export default defineConfig({
  root: '.',
  plugins: [pagesJsonPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        ...Object.fromEntries(htmlFiles.map(f => [f.replace('.html', ''), f]))
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true
  }
})
