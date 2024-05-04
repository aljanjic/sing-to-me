import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import Song from '../songs/index';


type Return = {
    songs: typeof Song[];
};

export const getSongs = async() => {
    
    const mongoClient = await clientPromise;
    const data = await mongoClient.db('sing-to-me').collection('songs').find().toArray()

    return JSON.parse(JSON.stringify(data))

}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await getSongs();
    res.status(200).json({songs: data})
};