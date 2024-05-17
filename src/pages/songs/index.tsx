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


// 'All',
const genres = ['Sve pesme',  'Domaće',  'Strane',  'Zabavna', 'Narodna', 'Rock', 'EX-YU', 'Balade', 'Pop' ];

const Songs: NextPage = ({ songs: s }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [activeGenre, setActiveGenre] = React.useState<string>('Sve pesme');
    const [searchSong, setSearchSong] = React.useState<string>('');

    const { data: { data: { songs = s } = {} } = {} } = useQuery(
        ['songs'], 
        () => axios('api/songs').then(res => res.data)
    );

    if (!songs) {
        return 'Songs are loading..'; 
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = event.target.value;
        setSearchSong(newSearchTerm);
    
        if (newSearchTerm === '') {
            setActiveGenre('Sve pesme');
        }
    };

    const handleGenreChange = (genre) => {
        setActiveGenre(genre)
        setSearchSong('')
    }

    
    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      };

      const filteredSongs = songs.filter((song: Song) => {
        const searchNormalized = normalizeText(searchSong);
        if (searchNormalized) {
            const songNameMatch = song.songName && typeof song.songName === 'string' &&
                normalizeText(song.songName.toLowerCase()).includes(searchNormalized);
            const musicianMatch = song.musician && typeof song.musician === 'string' &&
                normalizeText(song.musician.toLowerCase()).includes(searchNormalized);
    
            return songNameMatch || musicianMatch;
        }
        return activeGenre === 'All' || (song.genres && song.genres.includes(activeGenre));
    });

    return (
        <>
            <Container>
            {/* <h1>Muzički žanr:</h1> */}
                <Grid container alignItems="center" justifyContent="center" sx={{ mt: 2}} >
                    <Grid item xs={12} style={{}}>
                        <TextField 
                            fullWidth 
                            label="Traži pesmu" 
                            id="fullWidth"
                            onChange={handleSearchChange}                                  
                            // onChange={(e) => { handleSearch(e.target.value)}}
                            variant="outlined"
                            value={searchSong}
                            style={{ margin: '20px 0',  }} 
                        />
                    </Grid>

                    <Grid item xs={12} style={{ width: '75%' }}>
                        {genres.map((genre: string, index: number) => {
                            return (
                                <Button
                                    style={{ margin: 5 }}
                                    variant={activeGenre.toLowerCase() === genre.toLowerCase() ? "contained" : "outlined"}
                                    color={activeGenre.toLowerCase() === genre.toLowerCase() ? "success" : "primary"}
                                    key={index}
                                    onClick={() => handleGenreChange(genre)}
                                >
                                    {genre}
                                </Button>
                            );
                        })}
                    </Grid>
                </Grid>
            </Container>

            <Container>
                <h1>{searchSong ? `Rezultati za "${searchSong}"` : `${activeGenre} lista`}</h1>
                <Grid container spacing={0} sx={{ mt: 1 }} alignItems="center" justifyContent="center">
                    {filteredSongs.map((song: Song) => (
                        <SongComponent song={song} key={song._id?.toString()} />
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default Songs;
