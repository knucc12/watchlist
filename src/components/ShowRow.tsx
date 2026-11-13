import { type Show } from "../data/watchlist";
import { cn } from "../utils/cn";

type ShowRowProps = {
    show: Show,
    onClick: () => void
};

function ShowRow({ show, onClick }: ShowRowProps){
    return(
        <div onClick={onClick} className="flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg">
            <div className="flex flex-col">
                <p className="font-bold capitalize">{show.title}</p>
                <p className="opacity-75">{show.year}</p>
            </div>
            <span className={cn("rounded-full text-center px-3 font-bold capitalize", 
                {
                    "bg-yellow-200 text-yellow-700": show.kind === 'Film',
                    "bg-purple-200 text-purple-700": show.kind === 'Serie',
                })}>{show.kind}</span>
        </div>
    )
};

export default ShowRow;