import {Song}from '@/pages/songs/index';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import Tooltip from '@mui/material/Tooltip';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Paper from '@mui/material/Paper';



const SongComponent = ({song} : {song: Song}) => {
    return (
       <div>

            <Paper elevation={3} style={{width: 350, padding:10, margin: 25}}>
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
            </Paper>
        
        </div>

    )
}

export default SongComponent;