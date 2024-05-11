import { Song } from '@/pages/songs/index';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import Tooltip from '@mui/material/Tooltip';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';



const SongComponent = ({song} : {song: Song}) => {
    return (
        <Grid item 
        // style={{marginBottom: 15}}
        >

        {/* <Grid container direction="column" justifyContent="center" alignItems="center" > */}
            <Paper elevation={1} style={{width: 300, padding:10}}>
            <h3>
            <span
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}
                >
            {song.musician} - {song.songName} 
            {/* <MusicNoteIcon fontSize='small' style={{marginLeft: 3}} /> */}
            </span>
            </h3>
            <p>{song.genres?.slice(1).join(', ')}</p>
            </Paper>
        
         {/* </Grid> */}

        </Grid>
    )
}

export default SongComponent;