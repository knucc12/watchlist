import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router"
import { env } from "../utils/env";
import { ArrowLeft } from "lucide-react";
import type { Show } from "../data/watchlist";
import AddShowForm from "../components/AddShowForm";

function ShowPage() {
    const { id } = useParams<{id: string}>();
    const navigate = useNavigate();
    const [currentShow, setCurrentShow] = useState<Show>();
    const [titles, setTitles] = useState<string[]>([]);

    async function onUpdateShow(data: Omit<Show, "id">) {
    await fetch(env.backendUrl + '/watchlist/' + id, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    navigate('/');
  }

    useEffect(() => {
        fetch(`${env.backendUrl}/watchlist/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setCurrentShow(data);
        })
    }, [id]);

    useEffect(() => {
    fetch(`${env.backendUrl}/watchlist`)
    .then(res => res.json())
    .then((data: Show[]) => {
        setTitles(data.filter(show => String(show.id) !== id).map(show => show.title));
    })
}, [id])

  return (
    <div className="flex h-screen justify-center items-center">
            <div className="w-full max-w-md">
                <div className="flex items-center gap-3 mb-4">
                    <Link to={'/'}>
                    <button className="flex bg-gray-100 border border-gray-300 px-2 py-2 items-center justify-center rounded-full">
                        <ArrowLeft/>
                    </button>
                    </Link>
                <h1 className="font-bold text-4xl">Modifica show</h1>
                </div>
            <AddShowForm defaultValues={currentShow} onSubmit={onUpdateShow} titles={titles}/>
            </div>
        </div>
  )
}

export default ShowPage