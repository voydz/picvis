import firebase from '../../lib/firebaseApp'
import { fetchImageHash } from '../../lib/hash'
import { parse } from '../../lib/whapi'

export default async function handler(req, res) {
  const db = firebase.firestore()

  try {
    // parse whapi webhook
    const { sender_id, images } = parse(req.body)

    for (let image of images) {
      const { value, time } = image

      try {
        // fetch a perception hash
        const hash = await fetchImageHash(value)

        // save the docs with hash as id
        // we will prevent overwriting
        // this keeps us from duplicates
        await db.collection('images').doc(hash).set({
          sender_id,
          hash,
          ext: value,
          timestamp: time,
          approved: -1,
        })
      } catch (err) {
        // Mostly just catching duplicates
        // (document updates which are denied).
        console.log(`Probably catched duplicate image: ${err.message}`);
      }
    }

    // TODO feedback makes whapi behave ... strange
    // whatsapp crashes on relay device
    // await send(sender_id, `You sent ${images.length} images`)

    res.status(200).json({ ok: true })
  } catch (err) {
    console.log(err)
    res.status(200).json({ ok: false })
  }
}
