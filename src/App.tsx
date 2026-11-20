import { useEffect, useState } from "react"
import AddShowForm from "./components/AddShowForm"
import ShowRow from "./components/ShowRow"
import { watchlist as initialWatchlist, type Show } from "./data/watchlist"
import { cn } from "./utils/cn";
import { env } from "./utils/env";

type Filter = "Tutti" | "Serie" | "Film";

function App() {

  const [nextWatch, setNextWatch] = useState<Show>();
  const [activeFilter, setActiveFilter] = useState<Filter>("Tutti");
  const [watchlist, setWatchlist] = useState(initialWatchlist);
  const [editingShow, setEditingShow] = useState<Show>();

  useEffect(() => {
    fetch(env.backendUrl + '/watchlist')
    .then(res => res.json())
    .then(data => {
      setWatchlist(data);
    })
  }, []);

  function OnShowClick(show: Show){
    if (nextWatch?.id === show.id) {
      setNextWatch(undefined);
    } else {
      setNextWatch(show);
    }
  };

  async function onAddShow(data: Omit<Show, "id">) {
    const res = await fetch(env.backendUrl + '/watchlist', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type' : 'application/json' },
    })
    const newShow = await res.json();
    setWatchlist(prev => [...prev, newShow])
  };

  async function onUpdateShow(data: Omit<Show, "id">) {
    const res = await fetch(env.backendUrl + '/watchlist/' + editingShow?.id, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    const updatedShow = await res.json();
    setWatchlist(prev => prev.map(show => show.id === updatedShow.id ? updatedShow : show))
    setNextWatch(prev => prev?.id === updatedShow.id ? updatedShow : prev)
    setEditingShow(undefined);
  }

  async function onDeleteShow(id: number) {
    await fetch(env.backendUrl + '/watchlist/' + id, {
      method: 'DELETE',
    });
    setWatchlist(prev => prev.filter(show => show.id !== id));
    setNextWatch(prev => prev?.id === id ? undefined : prev)
    setEditingShow(prev => prev?.id === id ? undefined : prev)
  }

  return (
    <>
    <div className="flex flex-col justify-center items-center p-12">
    <h1 className="font-bold text-4xl text-center">La mia watchlist</h1>

    <div className="flex gap-4 mt-4">
      {["Tutti", "Serie", "Film"].map(filtro => 
      <button 
      key={filtro}
      className={cn("px-4 py-2 bg-gray-200 rounded-full capitalize", {
        "bg-blue-500 text-white": activeFilter === filtro
      })}
      onClick={() => setActiveFilter(filtro as Filter)}>{filtro}</button>)}
    </div>

    <div className="w-xl flex flex-col gap-4 py-4">
      {watchlist.filter(show => activeFilter === "Tutti" || show.kind === activeFilter).map(show => (
        <ShowRow onClick={() => OnShowClick(show)}
        onDelete={() => onDeleteShow(show.id)}
        onEdit={() => setEditingShow(show)} 
        show={show} key={show.id}>
        </ShowRow>))}
      </div>

      <p>{watchlist.length} titoli: {watchlist.filter(show => show.kind === "Film").length} film e {watchlist.filter(show => show.kind === "Serie").length} serie</p>
      {nextWatch && <p className="font-bold">Stasera guardo: {nextWatch.title}</p>}

      <div className="mt-4">
        <AddShowForm 
        defaultValues={editingShow}
        onSubmit={editingShow ? onUpdateShow : onAddShow}
        onCancel={() => setEditingShow(undefined)}
        titles={watchlist.filter(show => show.id !== editingShow?.id).map(show => show.title)} />
      </div>

    </div>
    </>
  )
}

export default App