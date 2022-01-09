# Subscrition Service

## 개요

Email 구독자 정보를 관리하는 서비스

## Tech Stack

- Node.js
- PostgreSQL
- Kafka
- grpc

## Environment variables

| Name                    |    Default Value    |       Description       |
| :---------------------- | :-----------------: | :---------------------: |
| PORT                    |        3001         | Port number to work in  |
| KAFKA_CLIENT_ID         | subscription-worker |     Kafka client id     |
| KAFKA_BROKER            |   localhost:9093    |  Kafka broker endpoint  |
| KAFKA_CONSUMER_GROUP_ID | subscription-group  | Kafka consumer group id |


## Running

- postgreSQL DB 스키마 적용

````bash
## DB 생성 및 Role 설정
psql postgresql://duarbdhks@localhost:30040 < db/01_global.sql

## Schema 생성
psql postgresql://subscription:test123@localhost:30040/subscription < db/02_subscription.sql
````

- 환경 별 Running

````bash
## product
npm run start

## development
npm run start:dev

````
