// pages/api/songs.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { search, filter } = req.query;
        const client = await clientPromise;
        const db = client.db("sing-to-me");

        let query = {};

        if (search) {
            query = { ...query, songName: { $regex: search, $options: "i" } };  // Case-insensitive regex search
        }

        if (filter) {
            query = { ...query, genres: filter };
        }

        const songs = await db.collection("songs").find(query).toArray();
        res.status(200).json(songs);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
