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

const Songs: NextPage = ({ songs: s }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [activeGenre, setActiveGenre] = React.useState<string>('All');

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
            <h1>Muzički žanr:</h1>

                <Grid container alignItems="center" justifyContent="center">

                    <Grid item>
                        {['All','Sve pesme',  'Domace',  'Strane',  'Zabavna', 'Narodna', 'Rock', 'EX-YU', 'Balade', 'Pop' ].map((genre: string, index: number) => {
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

                    {songs.filter((song: Song) => activeGenre === 'All' || song.genres.includes(activeGenre)).map((song: Song) => {
                        return <SongComponent song={song} key={song._id?.toString()} />;
                    })}
                </Grid>
            </Container>
        </>
    );
};

export default Songs;
