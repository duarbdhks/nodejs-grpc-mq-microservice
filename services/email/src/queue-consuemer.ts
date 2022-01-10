import { sendEmailTopic } from './config'
import { consumer } from './kafka'
import Logger from './logger'
import { sendEmail } from './provider'

export async function listenToQueue() {
  const logger = Logger.create({}).withScope('listenToQueue')
  await consumer.connect()
  logger.info(`Listening to queue on Kafka consumer`)
  await consumer.subscribe({ topic: sendEmailTopic, fromBeginning: true })
  await consumer.run({
    eachMessage: async (options) => {
      const { topic, message, partition } = options
      logger.withTag('consumer.eachMessage').info(`Received message - topic::${topic} / partition::${partition}`)

      const _message = message.value?.toString('utf8') || ''
      const payload = JSON.parse(_message)

      if (topic === sendEmailTopic) {
        await sendEmail({
          to: payload.email,
          title: '구독 성공',
          body: '당신은 성공적으로 우리의 뉴스레터를 받았습니다.',
        })
      } else {
        logger.withTag('consumer.eachMessage').info(`Received unknown - topic::${topic} / partition::${partition}`)
      }
    }
  })
}
