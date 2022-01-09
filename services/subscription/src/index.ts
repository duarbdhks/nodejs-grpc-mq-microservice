import server from './server'
import Logger from './logger'
import { port } from './config'

async function main() {
  const logger = Logger.create({}).withScope('application').withTag('run')

  await server.start(`0.0.0.0:${port}`)
  logger.success(`Application Booted on port: ${port}`)

}

main()
