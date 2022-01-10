# Email Service

## 개요

Email Send 서비스 (실제 이메일 보내진 않고, 로그로 처리함.)

## Tech Stack

- Node.js
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

- 환경 별 Running

````bash
## product
npm run start

## development
npm run start:dev

````
