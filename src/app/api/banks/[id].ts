import { NextApiRequest, NextApiResponse } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const { id } = req.query
  const payload = await getPayload({ config: configPromise })

  switch (method) {
    case 'GET':
      // Handle GET request (fetch bank by ID)
      try {
        if (typeof id !== 'string') {
          return res.status(400).json({ message: 'Invalid ID' })
        }

        const bank = await payload.findByID({ collection: 'banks', id })
        if (!bank) {
          return res.status(404).json({ message: 'Bank not found' })
        }
        return res.status(200).json(bank)
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching bank' })
      }

    case 'DELETE':
      // Handle DELETE request (delete bank by ID)
      try {
        if (typeof id !== 'string') {
          return res.status(400).json({ message: 'Invalid ID' })
        }
        const bank = await payload.findByID({ collection: 'banks', id })
        if (!bank) {
          return res.status(404).json({ message: 'Bank not found' })
        }
        await payload.delete({ collection: 'banks', id }) // Ensure Payload's delete function is called
        return res.status(200).json({ message: 'Bank deleted successfully' })
      } catch (error) {
        return res.status(500).json({ message: 'Error deleting bank' })
      }

    default:
      return res.status(405).json({ message: 'Method Not Allowed' })
  }
}
