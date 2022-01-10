import logger from './logger'

interface ISendEmail {
  to: string
  body: string
  title: string
}

export async function sendEmail(options: ISendEmail) {
  const { title, body, to } = options
  logger.withScope('provider')
    .withTag('sendEmail')
    .success(`이메일 전송 성공 - to::${to} / title::${title} / body::${body}`)
}
