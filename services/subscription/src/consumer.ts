import { producer } from './kafka'
import Logger from './logger'
import * as Subscription from './models/subscription'
import { sendEmailTopic } from './config'

const logger = Logger.create({}).withScope('consumers')

export async function findAll(ctx: any): Promise<void> {
  const rows = await Subscription.findAll(ctx.req)
  ctx.res = { rows }
  logger.withTag('findAll').success('findAll')
}

export async function findOne(ctx: any): Promise<void> {
  const { sid } = ctx.req
  ctx.res = await Subscription.findOne({ sid })
  logger.withTag('findOne').success(`findOne sid::${sid}`)
}

export async function create(ctx: any): Promise<void> {
  const subscription = await Subscription.create(ctx.req)
  logger.withTag('create').success(`Sending an email to ${ctx.req.email}`)
  setImmediate(async () => {
    await producer.send({ topic: sendEmailTopic, messages: [{ value: JSON.stringify(ctx.req) }] })
  })
  ctx.res = subscription
}

export async function cancel(ctx: any): Promise<void> {
  const { sid } = ctx.req
  ctx.res = await Subscription.cancel({ sid })
  logger.withTag('cancel').success('cancel')
}
