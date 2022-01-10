import { consumer, producer } from './kafka'
import { subscriptionCreateTopic, subscriptionDeleteTopic, sendEmailTopic } from './config'
import * as Subscriptions from './consumer'
import Logger from './logger'

export async function listenToQueue() {
  const logger = Logger.create({}).withScope('listenToQueue')
  await consumer.connect()
  logger.info('Listening to queue on Kafka consumer')
  await consumer.subscribe({ topic: subscriptionCreateTopic, fromBeginning: true })
  await consumer.subscribe({ topic: subscriptionDeleteTopic, fromBeginning: true })

  await consumer.run({
    eachMessage: async (options) => {
      const { topic, message, partition } = options
      logger.withTag('consumer.eachMessage').info(`Received message - topic::${topic} / partition::${partition}`)

      const _message = message.value?.toString('utf8') || ''
      const payload = JSON.parse(_message)
      if (topic === subscriptionCreateTopic) {
        await Subscriptions.create(payload)

        logger.withTag('consumer.eachMessage').info(`Sending email to ${payload.email}`)
        setImmediate(async () => {
          await producer.send({ topic: sendEmailTopic, messages: [{ value: message.value }] })
        })
      } else if (topic === subscriptionDeleteTopic) {
        await Subscriptions.cancel(payload)
      } else {
        logger.withTag('consumer.eachMessage').info(`Received unknown - topic::${topic} / partition::${partition}`)
      }
    }
  })
}
