import { useState } from "react"
import AddShowForm from "./components/AddShowForm"
import ShowRow from "./components/ShowRow"
import { watchlist as initialWatchlist, type Show } from "./data/watchlist"
import { cn } from "./utils/cn";

type Filter = "Tutti" | "Serie" | "Film";

function App() {

  const [nextWatch, setNextWatch] = useState<Show>();
  const [activeFilter, setActiveFilter] = useState<Filter>("Tutti");
  const [watchlist, setWatchlist] = useState(initialWatchlist)

  function OnShowClick(show: Show){
    if (nextWatch?.id === show.id) {
      setNextWatch(undefined);
    } else {
      setNextWatch(show);
    }
  };

  function OnSubmit(data: Omit<Show, "id">){
    setWatchlist(prev => [...prev, {
      id: Math.max(0, ...prev.map(show => show.id)) + 1,
      ...data,
    }])
  };

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
        show={show} key={show.id}>
        </ShowRow>))}
      </div>

      <p>{watchlist.length} titoli: {watchlist.filter(show => show.kind === "Film").length} film e {watchlist.filter(show => show.kind === "Serie").length} serie</p>
      {nextWatch && <p className="font-bold">Stasera guardo: {nextWatch.title}</p>}

      <div className="mt-4">
        <AddShowForm onSubmit={OnSubmit} titles={watchlist.map(show => show.title)} />
      </div>

    </div>
    </>
  )
}

export default App