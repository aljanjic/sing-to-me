import Song from "@/components/Song";
import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";


type Song = {
    _id: string,
    musician: string,
    songName: string,
    genres: string[]
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            songs: [
                {
                    _id:"662a51452176c759f3ee1f",
                    musician:"The Beatles",
                    songName:"Come Together",
                    genres:["Rock","Classic"]
                },

                {
                    _id:"662a512q2176c759f3edfe20",
                    musician:"The Beatles",
                    songName:"Hey Jude",
                    genres:["Rock"]
                },
            ] as Song[]
        }
    }
};

const Songs: NextPage = ({songs}: InferGetStaticPropsType<typeof getStaticProps>) => {
    console.log(songs)
    return (
        <>  
            <h1> Songs: </h1>
            {songs.map((song: Song) => {
                return (
                    <div>
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