import knex from 'knex'
import { dbConfig } from './config'

export default knex(dbConfig)
