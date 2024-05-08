import clientPromise from "@/lib/mongodb";
import { MongoClient, ObjectId } from "mongodb";
import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { getSongs } from "../api/songs";
import {useQuery} from '@tanstack/react-query'
import axios from "axios";
import Button from "@mui/material/Button";
import SongComponent from "@/components/SongComponent";
import Grid from '@mui/material/Grid';
import  Container  from '@mui/material/Container';



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
    songs: s,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    
    const { data: {data: {songs = s } = {} } = {} } = useQuery(
        ['songs'], 
        () => {
        return axios('api/songs') as any;
        }
    );

    if (songs){
    return (
            <>  

                {
                    ['Rock', 'Pop', 'Jazz', 'Classic','Yellow'].map((genre : string, index : number) => {
                    return (
                        <Button variant="contained" color="success" key={index}>
                        {genre} 
                        </Button>
                    )}
                    )
                }

                <h1> Songs: </h1>
                <Container>
                    <Grid container spacing={2} sx={{mt: 1}} alignItems="center" justifyContent="center">
                        {songs.map((song: Song) => { 
                            return <SongComponent song={song} key={song._id?.toString()} />
                        })}
                    </Grid>
                </Container>
            </>
        )
    } else 

    return null;
}

export default Songs