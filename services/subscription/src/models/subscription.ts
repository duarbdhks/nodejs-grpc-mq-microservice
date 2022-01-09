import grpc from '@grpc/grpc-js'
import knex from 'knex'
import moment from 'moment'
import pg from '../pg'
import QueryBuilder = knex.QueryBuilder

enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
}

interface ISubscriptionFilter {
  gender?: GENDER,
  consent_flag?: boolean,
  date_of_birth?: Date,
  nid?: number
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
