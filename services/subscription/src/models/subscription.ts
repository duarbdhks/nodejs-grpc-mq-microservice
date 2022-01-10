import grpc from '@grpc/grpc-js'
import { Knex } from 'knex'
import moment from 'moment'
import pg from '../pg'
import QueryBuilder = Knex.QueryBuilder
import Transaction = Knex.Transaction

enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
}

interface ISubscriptionId {
  sid: string
}

interface ISubscriptionFilter {
  gender?: GENDER,
  consent_flag?: boolean,
  date_of_birth?: Date,
  nid?: number
}

interface ICreateSubscription {
  email: string
  first_name?: string
  gender?: GENDER
  date_of_birth: Date
  consent_flag: boolean
  nid: number
}

export async function findAll(options: ISubscriptionFilter): Promise<QueryBuilder> {
  const { nid, date_of_birth, consent_flag, gender } = options
  return pg.queryBuilder()
    .select('*')
    .from('subscription')
    .where(function () {
      if (gender !== undefined) this.where({ gender })
      if (consent_flag !== undefined) this.andWhere({ consent_flag })
      if (date_of_birth !== undefined) this.andWhere({ date_of_birth: moment(date_of_birth).format('YYYY-MM-DD') })
      if (nid !== undefined) this.andWhere({ nid })
    })
}

export async function findOne(options: ISubscriptionId): Promise<QueryBuilder> {
  const { sid } = options
  const subscription = await pg.queryBuilder()
    .select('*')
    .from('subscription')
    .where({ sid })
    .first()

  if (!subscription) throw new Error('Subscription not found')
  return subscription
}

export async function create(options: ICreateSubscription): Promise<void> {
  const { nid, date_of_birth, consent_flag, gender, first_name, email } = options
  await pg.queryBuilder()
    .insert({ nid, date_of_birth: moment(date_of_birth).format('YYYY-MM-DD'), consent_flag, gender, first_name, email })
    .into('subscription')
    .onConflict(['email', 'nid'])
    .merge()

  return pg.queryBuilder()
    .select('sid')
    .from('subscription')
    .where({ email, nid })
    .first()
}

export async function cancel(options: ISubscriptionId): Promise<QueryBuilder> {
  const { sid } = options
  return pg.transaction(async (trx) => {
    const subscription = await pg.queryBuilder()
      .select('*')
      .from('subscription')
      .where({ sid })
      .transacting(trx)
      .forUpdate()
      .first()

    await pg.queryBuilder()
      .delete()
      .from('subscription')
      .where({ sid })
      .transacting(trx)

    return { sid }
  })
}
