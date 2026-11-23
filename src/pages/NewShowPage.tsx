import { ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { env } from "../utils/env"
import type { Show } from "../data/watchlist"
import AddShowForm from "../components/AddShowForm"
import { useEffect, useState } from "react"

const NewShowPage = () => {
    const navigate = useNavigate();

    const [titles, setTitles] = useState<string[]>([]);

    useEffect(() => {
    fetch(env.backendUrl + '/watchlist')
        .then(res => res.json())
        .then((data: Show[]) => setTitles(data.map(show => show.title)));
    }, []);

    async function onAddShow(data: Omit<Show, "id">) {
    await fetch(env.backendUrl + '/watchlist', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type' : 'application/json' },
    })
    navigate('/');
  };

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="w-full max-w-md">
                <div className="flex items-center gap-3 mb-4">
                    <Link to={'/'}>
                        <button className="flex bg-gray-100 border border-gray-300 px-2 py-2 items-center justify-center rounded-full">
                            <ArrowLeft />
                        </button>
                    </Link>
                    <h1 className="font-bold text-4xl">Aggiungi show</h1>
                </div>
                <AddShowForm onSubmit={onAddShow} titles={titles}/>
            </div>
        </div>
    )
}

export default NewShowPage