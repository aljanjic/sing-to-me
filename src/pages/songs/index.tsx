// import Song from "@/components/Song";
import clientPromise from "@/lib/mongodb";
import { MongoClient, ObjectId } from "mongodb";
import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { getSongs } from "../api/songs";


export type Song = {
    _id?: ObjectId,
    musician: string,
    songName: string,
    genres: string[],
}

export const getStaticProps: GetStaticProps = async (context) => {


    const data = await getSongs();

    console.log('Data From MongoDB: ', data)
    
    return {
        props: {
            songs: data,
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
                    <div key={song._id?.toString()}>
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