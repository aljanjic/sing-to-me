// import Song from "@/components/Song";
import clientPromise from "@/lib/mongodb";
import axios from "axios";
import { MongoClient, ObjectId } from "mongodb";
import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";



type Song = {
    _id: ObjectId,
    musician: string,
    songName: string,
    genres: string[],
    file_name: string
}

export const getStaticProps: GetStaticProps = async (context) => {


    const mongoClient = await clientPromise;

    const data = await mongoClient
        .db('sing-to-me')
        .collection('songs')
        .find()
        .toArray()

    console.log('Data From MongoDB: ', data)
    
    return {
        props: {
            songs:  JSON.parse(JSON.stringify(data)),
        },
        revalidate: 60,
    }
};

const Songs: NextPage = ({
    songs,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>  
            <h1> Songs: </h1>
            {songs.map((song: Song) => {
                return (
                    <div key={song._id.toString()}>
                    {/* <p>{song.file_name}</p> */}
                    <p>{song.musician}</p>
                    <p>{song.songName}</p>
                    <p>{song.genres.map((genre)=>{
                        return(`${genre} `)
                    })}</p>
                    </div>
                )
            }) }
        </>
    )
}

export default Songs