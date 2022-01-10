import path from 'path'
import Mali from 'mali'
import Logger from './logger'
import * as Email from './consumer'

const logger = Logger.create({}).withScope('grpc')
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}
const emailService = path.join(path.resolve('.'), './protofiles/email.proto')
const health = path.join(path.resolve('.'), './protofiles/health.proto')

const app = new Mali()

app.addService(emailService, 'Email', options)
app.addService(health, 'Health', options)

app.use(async (ctx: any, next: any) => {
  logger.withScope('grpc').debug(`Receiving:: ${ctx.fullName}`)
  return next()
})

app.use({ Email })
app.use('grpc.health.v1.Health', 'Check', (ctx: any) => (ctx.res = { status: 1 }))

app.on('error', (error) => {
  if (!error.code) logger.fatal(error)
})

export default app
