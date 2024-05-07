import {Song}from '@/pages/songs/index';


const SongComponent = ({song} : {song: Song}) => {
    return (
        <div key={song._id?.toString()}>
        <p>{song.musician}</p>
        <p>{song.songName}</p>
        <p>{song.genres?.map((genre)=>{
            return(`${genre} `)
        })}</p>
        {/* <Button  variant="contained" color="success"> B as button </Button> */}
        <br></br>
        </div>
    )
}

export default SongComponent;