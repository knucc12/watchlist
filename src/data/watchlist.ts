 export type Show = {
    id: number;
    title: string;
    year: number;
    kind: 'Film' | 'Serie';
}

export const watchlist: Show[] = [
    {
        id: 1,
        title: 'Bridgerton',
        year: 2020,
        kind: 'Serie',
    },
    {
        id: 2,
        title: 'White Chicks',
        year: 2004,
        kind: 'Film',
    },
    {
        id: 3,
        title: 'The Office',
        year: 2012,
        kind: 'Serie',
    },
    {
        id: 4,
        title: 'Scream',
        year: 1996,
        kind: 'Film',
    },
    {
        id: 5,
        title: 'The Vampire Diaries',
        year: 2016,
        kind: 'Serie',
    },
    {
        id: 6,
        title: 'La Città Incantata',
        year: 2001,
        kind: 'Film',
    }
]