import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Song from '../components/Song'; // Make sure this component is expecting a prop of type Song
import SearchBar from '../components/SearchBar';
// import SearchSongs from '@/app/search-song/SearchSongs';

interface Song {
    id: string;
    musician: string;
    songName: string;
    genres: string[];
}

const Home: React.FC = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchSongs();
    }, [filter, searchTerm]);

    const fetchSongs = async () => {
        const response = await axios.get(`/api/songs?search=${searchTerm}&filter=${filter}`);
        setSongs(response.data);  // Assuming response.data is an array of Song objects
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        fetchSongs();
    };

    const handleFilter = (genre: string) => {
        setFilter(genre);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            {/* <SearchSongs /> */}

            <div>
                {['Rock', 'Pop', 'Jazz', 'Classic','Yellow'].map(genre => (
                    <button key={genre} onClick={() => handleFilter(genre)}>
                        {genre}
                    </button>
                ))}
            </div>
            <div>
                {/* {songs.map(song => <Song key={song.id} song={song} />)} */}
            </div>
        </div>
    );
};

export default Home;
