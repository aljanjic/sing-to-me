import { ObjectId } from "mongodb";
import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { getSongs } from "../api/songs";
import {useQuery} from '@tanstack/react-query'
import axios from "axios";
import Button from "@mui/material/Button";
import SongComponent from "@/components/SongComponent";
import Grid from '@mui/material/Grid';
import  Container  from '@mui/material/Container';
import React from "react";



export type Song = {
    _id?: ObjectId,
    musician: string,
    songName: string,
    genres: string[],
}



export const getStaticProps: GetStaticProps = async (context) => {

    const data = await getSongs();
  
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

    const [activeGenre, setActiveGenre] = React.useState<string>('all');

    return (
            <>  

                {/* {
                    ['All', 'Rock', 'Pop', 'Jazz', 'Classic','Yellow'].map((genre : string, index : number) => {
                    return (
                        <Container>
                            <Grid container spacing={2}>
                                <Grid item> 
                                <Button 
                                    variant={activeGenre.toLowerCase() === genre.toLowerCase() ? "contained" : "outlined"} 
                                    color={activeGenre.toLowerCase() === genre.toLowerCase() ? "success" : "primary"}
                                    key={index}
                                    onClick={() => setActiveGenre(genre)}
                                    >
                                {genre} 
                                </Button>
                                </Grid>
                            </Grid>
                        </Container> 
                    )}
                    )
                } */}


                
                    
                <Container>
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item > 

                        {['All', 'Rock', 'Pop', 'Jazz', 'Classic','Yellow'].map((genre : string, index : number)=> {
                        
                                    return  (<Button style={{margin:5}}
                                        variant={activeGenre.toLowerCase() === genre.toLowerCase() ? "contained" : "outlined"} 
                                        color={activeGenre.toLowerCase() === genre.toLowerCase() ? "success" : "primary"}
                                        key={index}
                                        onClick={() => setActiveGenre(genre)}
                                        >
                                    {genre} 
                                    </Button>
                                    )
                        })
                    }

                        </Grid>
                    </Grid>
                </Container> 
                    
                    
    

                <Container>

                    <h1> {activeGenre} songs list: </h1>
                    <Grid container spacing={2} sx={{mt: 1}} alignItems="center" justifyContent="center">
                        {songs.filter((song: Song)=> song.genres.includes(activeGenre == 'All' ? 'All' : activeGenre)).map((song: Song) => { 
                            return <SongComponent song={song} key={song._id?.toString()} />
                        })}
                    </Grid>
                </Container>

            </>
        )
    } else 

    return 'Songs are loading..';
}

export default Songs