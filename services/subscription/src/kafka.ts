import { Kafka, logLevel } from 'kafkajs'
import { kafkaBroker, kafkaClientId, kafkaConsumerGroupId } from './config'

export const kafka = new Kafka({
  clientId: kafkaClientId,
  brokers: [kafkaBroker],
  logLevel: logLevel.ERROR,
})

export const producer = kafka.producer()
export const consumer = kafka.consumer({ groupId: kafkaConsumerGroupId })
