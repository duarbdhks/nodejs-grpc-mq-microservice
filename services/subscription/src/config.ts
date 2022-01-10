const { PORT, KAFKA_CLIENT_ID, KAFKA_BROKER, KAFKA_CONSUMER_GROUP_ID } = process.env

export const port = PORT ?? 3001
export const kafkaClientId = KAFKA_CLIENT_ID ?? 'subscription-worker'
export const kafkaBroker = KAFKA_BROKER ?? 'kafka:9093'
export const kafkaConsumerGroupId = KAFKA_CONSUMER_GROUP_ID ?? 'subscription-group'

export const subscriptionCreateTopic = 'subscription-create'
export const subscriptionDeleteTopic = 'subscription-delete'
export const sendEmailTopic = 'email-send'

export const dbConfig = {
  client: 'pg',
  version: '13',
  connection: {
    database: 'subscription',
    user: 'subscription',
    port: 30040,  // dev
    // port: 5432,  // production
    password: 'test123'
  },
  pool: { min: 0, max: 5 },
  searchPath: ['public'],
  useNullAsDefault: false,
  asyncStackTrace: true,
}
