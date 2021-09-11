import {useRouter} from "next/router";

function Edit() {
    const router = useRouter()
    const {id} = router.query
    return <>Editando cliente agencia #{id}</>
}

export default Edit;