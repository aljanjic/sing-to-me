import SearchSongs from "./SearchSongs"
import SongsList from "./SongsList"

const VoicesPage = ({
    searchParams,
  }: {
    searchParams?: {
        query?: string
    };
}) => {
    const query = searchParams?.query || '';
    return (
        <div>
            <h1> Search Songs Here: </h1>
            <SearchSongs />
            <SongsList  query = {query} />
        </div>
    )
}

export default VoicesPage 