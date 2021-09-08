import {postJson, getTimestamp} from './utils'

export function parse(body) {
  // we are just interested in the data field
  const data = body?.app?.data

  // extract sender and profile (if sent)
  const sender_id = data?.sender?.id
  const profile = data?.profile

  // get all images from request
  const images = (data?.message ?? []).filter(({type}) => type === 'image')

  return { sender_id, profile, images }
}

export async function send(recipient, message) {
  return await postJson('https://whapi.io/api/send', {
    app: {
      id: process.env.NEXT_PUBLIC_WHAPI_APP_ID,
      time: getTimestamp(),
      data: {
        recipient: {
          id: recipient
        },
        // currently only text responses are allowed
        message: [
          {
            time: getTimestamp(),
            type: 'text',
            value: message,
          }
        ]
      }
    }
  });
}


