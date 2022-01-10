import { port } from './config'
import logger from './logger'
import { listenToQueue } from './queue-consuemer'
import server from './server'

async function mail() {
  server.start(`0.0.0.0:${port}`)
  logger.withScope('application')
    .withTag('run')
    .success(`Application Booted on port: ${port}`)
  await listenToQueue()
}

mail()
