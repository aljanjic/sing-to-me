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
            <h3>{song.songName} - {song.musician}</h3>
            <p>{song.genres.join(', ')}</p>
        </div>
    );
};

export default Song;
