export default function(req, res, next) {
  const host = req.headers.host
  const url = req.url
  const env = process.env.NODE_ENV
  const forceDomain = 'https://www.doctors-of-doom.com'

  if (env === 'production' && host === 'doctors-of-doom.com') {
    res.writeHead(301, { Location: forceDomain + url })
    return res.end()
  }

  return next()
}
