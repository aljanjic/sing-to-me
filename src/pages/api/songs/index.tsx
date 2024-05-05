import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { Song } from '../../songs/index'
import { ObjectId } from "mongodb";

type Return = {
    songs:  Song[];
};

export const getSongs = async(): Promise< Song[]> => {
    const mongoClient = await clientPromise;
    const data = await mongoClient.db('sing-to-me').collection('songs').find().toArray() as Song[];
    return JSON.parse(JSON.stringify(data))
}

export const addSong = async(song: Song) : Promise <ObjectId> => {
    const mongoClient = await clientPromise;
    const response = await mongoClient.db('sing-to-me').collection('songs').insertOne(song)

    return response.insertedId
}

export default async (req: NextApiRequest, res: NextApiResponse <Return | ObjectId | {error: string} > ) => {
    if (req.method == 'GET') {
        const data = await getSongs();
        res.status(200).json({songs: data})
    } else if (req.method == 'POST') {
        console.log(req.body)

        if(req.body.musician && req.body.songName && req.body.genres){
            const song: Song = {
                musician: req.body.musician,
                songName: req.body.songName,
                genres: req.body.genres
            }
    
            const insertedId = await addSong(song)
            res.revalidate('/songs')
            res.status(200).json(insertedId)
        } else {
            res.status(400).json({error: 'musician, songName and genres are required'})
        }

    }
};