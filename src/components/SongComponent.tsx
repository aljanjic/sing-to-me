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
            <Paper elevation={3} style={{width: 300, padding: 1, backgroundColor:'#adc5b7', }}> 
            <h3 style={{
                    display: 'flex',
                    flexDirection: 'column', // Set direction of flex items to column
                    alignItems: 'center', // Center align items horizontally
                    justifyContent: 'center' // Center align items vertically
                }}>
            <span style={{fontStyle: 'italic', marginRight: 2 }}> {song.musician}</span> 
            <span style={{  marginLeft: 2}}> {song.songName} </span> 
            {/* <MusicNoteIcon fontSize='small' style={{marginLeft: 3}} /> */}
            </h3>
            {/* <p>{song.genres?.slice(1).join(', ')}</p> */}
            </Paper>
        
         {/* </Grid> */}

        </Grid>
    )
}

export default SongComponent;