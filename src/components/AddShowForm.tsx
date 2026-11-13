import { useState } from "react";
import type { Show } from "../data/watchlist";
import { cn } from "../utils/cn";

type AddShowFormProps = {
  onSubmit: (data: Omit<Show, "id">) => void;
  titles: string[];
};

const KINDS: Show["kind"][] = ["Film", "Serie"];

const defaultState = {
  values: {
    title: "",
    year: "",
    kind: "Film" as Show["kind"],
  },
  errors: {
    title: [] as string[],
    year: [] as string[],
  },
};

const AddShowForm = ({ onSubmit, titles }: AddShowFormProps) => {
  const [formState, setFormState] = useState(defaultState);

  function addShow(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const title = formState.values.title.trim();
    const year = Number(formState.values.year);
    const currentYear = new Date().getFullYear();

    const errors = { title: [] as string[], year: [] as string[] };

    if (!title) {
      errors.title.push("Titolo obbligatorio");
    } else {
      if (title.length < 2) {
        errors.title.push("Inserisci almeno 2 caratteri");
      }
      if (titles.some((t) => t.trim().toLowerCase() === title.toLowerCase())) {
        errors.title.push("Titolo già presente nella lista");
      }
    }

    if (formState.values.year === "") {
      errors.year.push("Anno obbligatorio");
    } else if (year < 1900 || year > currentYear) {
      errors.year.push(`L'anno deve essere compreso tra il 1900 e il ${currentYear}`);
    }

    if (Object.values(errors).some((list) => list.length)) {
      setFormState((prev) => ({ ...prev, errors }));
      return;
    }

    onSubmit({ title, year, kind: formState.values.kind });
    setFormState(defaultState);
  }

  return (
    <form onSubmit={addShow} noValidate className="w-xl max-w-full flex flex-col gap-4">
      <h2 className="text-center text-xl font-bold">Aggiungi Titolo</h2>

      <input
        className="bg-gray-200 rounded-lg px-4 py-2"
        placeholder="Titolo"
        value={formState.values.title}
        onChange={(e) => {
          setFormState((prev) => ({
            ...prev,
            values: { ...prev.values, title: e.target.value },
          }));
        }}
      />
      {formState.errors.title.map((error) => (
        <p key={error} className="text-red-500 text-xs">{error}</p>
      ))}

      <input
        className="bg-gray-200 rounded-lg px-4 py-2"
        placeholder="Anno"
        type="number"
        value={formState.values.year}
        onChange={(e) => {
          setFormState((prev) => ({
            ...prev,
            values: { ...prev.values, year: e.target.value },
          }));
        }}
      />
      {formState.errors.year.map((error) => (
        <p key={error} className="text-red-500 text-xs">{error}</p>
      ))}

      <div className="flex gap-4">
        {KINDS.map((kind) => (
          <button
            key={kind}
            type="button"
            className={cn("px-4 py-2 bg-gray-200 rounded-full cursor-pointer", {
              "bg-blue-500 text-white": formState.values.kind === kind,
            })}
            onClick={() => {
              setFormState((prev) => ({
                ...prev,
                values: { ...prev.values, kind },
              }));
            }}
          >
            {kind}
          </button>
        ))}
      </div>

      <button type="submit" className="rounded-full px-4 py-2 bg-blue-400 w-fit cursor-pointer">
        Aggiungi
      </button>
    </form>
  );
};

export default AddShowForm;