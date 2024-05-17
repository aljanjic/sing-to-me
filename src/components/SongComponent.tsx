import { Song } from '@/pages/songs/index';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';



const SongComponent = ({song} : {song: Song}) => {
    return (
        <Grid item 
        style={{marginBottom: '2px'}}
        >

            <Paper elevation={1} style={{width: 300, padding: 1, backgroundColor:'#adc5b7', }}> 
            <h3 style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    textAlign: 'center'
                }}>
            <span style={{fontStyle: 'italic', marginRight: 2, width: '85%' }}> {song.musician}</span> 
            <span style={{  marginLeft: 2, width: '85%'}}> {song.songName} </span> 
            </h3>
            </Paper>
        

        </Grid>
    )
}

export default SongComponent;