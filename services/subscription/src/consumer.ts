import Logger from './logger'
import * as Subscription from './models/subscription'

const logger = Logger.create({}).withScope('consumers')

export async function findAll(ctx: any): Promise<void> {
  const rows = await Subscription.findAll(ctx.req)
  ctx.res = { rows }
  logger.success('findAll')
}

export async function findOne(ctx: any): Promise<void> {
  logger.success('findOne')
}

export async function create(ctx: any): Promise<void> {
  logger.success('create')
}

export async function cancel(ctx: any): Promise<void> {
  logger.success('cancel')
}
