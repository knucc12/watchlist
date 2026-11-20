import { useState } from "react";
import { type Show } from "../data/watchlist";
import { cn } from "../utils/cn";
import { Edit } from "lucide-react";
import { MorphIcon } from "morphicons/react";
import { Loader2, Trash } from "lucide";

type ShowRowProps = {
    show: Show,
    onClick: () => void,
    onDelete?: () => Promise<void>,
    onEdit?: () => void
};

function ShowRow({ show, onClick, onDelete, onEdit }: ShowRowProps){
    const [isDeleting, setIsDeleting] = useState(false);

    return(
        <div onClick={onClick} className="flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg">
            <div className="flex flex-col">
                <p className="font-bold capitalize">{show.title}</p>
                <p className="opacity-75">{show.year}</p>
            </div>
            <div className="flex items-center gap-2">
            <span className={cn("rounded-full text-center px-3 font-bold capitalize", 
                {
                    "bg-yellow-200 text-yellow-700": show.kind === 'Film',
                    "bg-purple-200 text-purple-700": show.kind === 'Serie',
                })}>{show.kind}</span>

                <button className="flex bg-gray-100 border border-gray-300 px-2 py-2 items-center justify-center rounded-full"
                        onClick={e => {
                            e.stopPropagation();
                            onEdit?.();
                        }}>
                            <Edit/>
                        </button>

                <button disabled={isDeleting}
                        onClick={async(e) => {
                            e.stopPropagation();
                            setIsDeleting(true);
                            await onDelete?.();
                            setIsDeleting(false);
                        }}
                        className="flex bg-gray-100 border border-gray-300 px-2 py-2 items-center justify-center rounded-full">
                            <MorphIcon className={cn("text-red-700", isDeleting && "animate-spin")}
                            icon={isDeleting ? Loader2 : Trash}/>
                        </button>
                    </div>

        </div>
    )
};

export default ShowRow;