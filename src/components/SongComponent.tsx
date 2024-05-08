import {Song}from '@/pages/songs/index';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import Tooltip from '@mui/material/Tooltip';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';


const SongComponent = ({song} : {song: Song}) => {
    return (
        <div key={song._id?.toString()}>
            {/* <p>{song.musician}</p>
            <p>{song.songName}</p>
            <p>{song.genres?.map((genre)=>{
                return(`${genre} `)
            })}</p>
            <br></br>

            <p> VS </p> */}
            <h3>
            <span
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}
            >
            {song.musician} - {song.songName} 
            <Tooltip title={song._id?.toString()}>
                <MusicNoteIcon fontSize='small' style={{marginLeft: 5}} />
            </Tooltip>
            </span>
            </h3>

            <p>{song.genres?.join(', ')}</p>

            <br></br>
        </div>
    )
}

export default SongComponent;