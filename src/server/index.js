/**
 * @file index
 * @author Cuttle Cong
 * @date 2018/4/26
 * @description
 */
const express = require('express')
const Crawler = require('../index')
const app = express()
const PORT = process.env.PORT || 9000

app.listen(PORT, () => {
  console.log('Run on http://localhost:%s/', PORT)
})

app.use((req, res, next) => {
  res.succ = function(data) {
    res.json({ code: 200, data })
  }
  res.fail = function(msg) {
    res.json({ code: 500, data: msg })
  }
  if (req.method === 'POST') {
    req.entity = req.body
  } else {
    req.entity = req.query
  }
  next()
})

app.all('/:type', async (req, res) => {
  const { goto, ...opt } = req.entity
  if (!goto) {
    res.fail('requires `goto`')
  } else {
    let crawler = new Crawler()
    await crawler.goto(goto)
    try {
      res.succ(await crawler.execute(req.params.type, opt))
    } catch (e) {
      res.fail(e.toString())
    }
  }
})

function error(err, req, res, next) {
  console.error(err)
  res.status(500).type('html').send(`<html>
<head>
<title>Error: ${err.message}</title>
</head>
<body>
<div>
<h2>${err.toString()}</h2>
<pre>
<code>${err.stack}</code>
</pre>
</div>
</body>
</html>`)
}
app.use(error)
