import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('sing-to-me');
    
    const songs = await db.collection('songs').find({}).toArray();
    res.status(200).json(songs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
