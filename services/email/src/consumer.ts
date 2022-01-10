import { sendEmail } from './provider'

export async function send(ctx: any) {
  await sendEmail(ctx.req)
  ctx.res = {}
}
