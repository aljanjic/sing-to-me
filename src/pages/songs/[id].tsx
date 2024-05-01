import { NextPage } from 'next'
import { useRouter } from 'next/router'

const Song: NextPage = () => {
    const router = useRouter()
    const { id } = router.query;
    return <h1> Song: {id} </h1>
}

export default Song;