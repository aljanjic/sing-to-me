import { ObjectId } from "mongodb";
import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { getSongs } from "../api/songs";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import Button from "@mui/material/Button";
import SongComponent from "@/components/SongComponent";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import React from "react";
import TextField from "@mui/material/TextField";


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
    };
};



const genres = ['All','Sve pesme',  'Domace',  'Strane',  'Zabavna', 'Narodna', 'Rock', 'EX-YU', 'Balade', 'Pop' ];

const Songs: NextPage = ({ songs: s }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [activeGenre, setActiveGenre] = React.useState<string>('All');
    const [searchSong, setSearchSong] = React.useState<string>('');

    const handleSearch = (searchTerm: string) => {
        console.log('Search item: ', searchTerm)
        setSearchSong(searchTerm)
    };

    const { data: { data: { songs = s } = {} } = {} } = useQuery(
        ['songs'], 
        () => axios('api/songs').then(res => res.data)
    );

    if (!songs) {
        return 'Songs are loading..'; // Early return before rendering any JSX
    }

    return (
        <>
            <Container>




            {/* <h1>Muzički žanr:</h1> */}
                <Grid container alignItems="center" justifyContent="center" sx={{ mt: 2}} >
                    <Grid item>
                        <TextField fullWidth label="Trazi pjesmu" id="fullWidth"                                 onChange={(e) => {
                                    handleSearch(e.target.value);
                                }} />

{/* 
                            <label htmlFor="search" className="sr-only">
                                Search    
                            </label> 
                            <input
                                className="peer block w-1/2 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="search"
                                onChange={(e) => {
                                    handleSearch(e.target.value);
                                }}
                                /> */}
                            {/* <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />  */}
                    </Grid>
                    <Grid item>
                        {genres.map((genre: string, index: number) => {
                            return (
                                <Button
                                    style={{ margin: 5 }}
                                    variant={activeGenre.toLowerCase() === genre.toLowerCase() ? "contained" : "outlined"}
                                    color={activeGenre.toLowerCase() === genre.toLowerCase() ? "success" : "primary"}
                                    key={index}
                                    onClick={() => setActiveGenre(genre)}
                                >
                                    {genre}
                                </Button>
                            );
                        })}
                    </Grid>
                </Grid>
            </Container>

            <Container>
            <h1>{activeGenre} lista:</h1>
                <Grid container spacing={0} sx={{ mt: 0 }} alignItems="center" justifyContent="center">

                    {songs.filter((song: Song) => activeGenre === 'All' || song.genres.includes(activeGenre)).filter((song: Song) => song.songName.toLowerCase().includes(searchSong.toLowerCase()) || song.musician.toLowerCase().includes(searchSong.toLowerCase() )).map((song: Song) => {
                        return <SongComponent song={song} key={song._id?.toString()} />;
                    })}
                </Grid>
            </Container>
        </>
    );
};

export default Songs;
