import router from '@adonisjs/core/services/router'

import docs from '#docs/openapi'

router.get('/docs/docs.json', async ({ response }) => {
  return response.ok(docs)
})

router.get('/docs', async ({ response }) => {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>PalaGuideBot API Docs</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css">
</head>
<body>
  <div id="swagger"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({ url: '/docs/docs.json', dom_id: '#swagger' })
    }
  </script>
</body>
</html>`
  return response.header('Content-Type', 'text/html').send(html)
})
