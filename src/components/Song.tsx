import React from 'react';

interface SongProps {
    song: {
        id: string;
        musician: string;
        songName: string;
        genres: string[];
    };
}

const Song: React.FC<SongProps> = ({ song }) => {
    return (
        <div>
            <h3> {song.musician} - {song.songName}</h3>
            <p>{song.genres.join(', ')}</p>
        </div>
    );
};

export default Song;
