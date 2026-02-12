export interface Game {
    id: number;
    title: string;
    platform: string;
    genre: string;
    releaseDate: string;
    favorite: boolean;
    cover?: string;
}

export let games: Game[] =[
    {
        id: 1,
        title: "The Legend of Zelda",
        platform: "Switch",
        genre: "Acción-aventura",
        releaseDate: "2017-03-03",
        favorite: false,
        cover: "",
    },
    {
        id: 2,
        title: "Super Mario Odyssey",
        platform: "Switch",
        genre: "Plataformas",
        releaseDate: "2017-10-27",
        favorite: false,
        cover: "",
    },
    {
        id: 3,
        title: "Half-Life 2",
        platform: "PC",
        genre: "FPS",
        releaseDate: "2004-11-16",
        favorite: false,
        cover: "",
    },
    {
        id: 4,
        title: "Grand Theft Auto V ",
        platform: "PS3",
        genre: "Acción-aventura",
        releaseDate: "2013-09-17",
        favorite: false,
        cover: "",
    },
    {
        id: 5,
        title: "Red Dead Redemption 2",
        platform: "PS4",
        genre: "Acción-aventura",
        releaseDate: "2018-10-26",
        favorite: false,
        cover: "",
    },
    {
        id: 6,
        title: "The Last of Us",
        platform: "PS3",
        genre: "Acción-aventura",
        releaseDate: "2013-06-14",
        favorite: false,
        cover: "",
    },
    {
        id: 7,
        title: "The Witcher 3: Wild Hunt",
        platform: "PS4",
        genre: "Rol",
        releaseDate: "2015-05-19",
        favorite: false,
        cover: "",
    },
    {
        id: 8,
        title: "Elden Ring",
        platform: "PS4",
        genre: "Rol",
        releaseDate: "2022-02-25",
        favorite: false,
        cover: "",
    },
    {
        id: 9,
        title: "BioShock",
        platform: "Xbox 360",
        genre: "Rol",
        releaseDate: "2007-08-21",
        favorite: false,
        cover: "",
    },
    {
        id: 10,
        title: "Resident Evil 4",
        platform: "Nintendo",
        genre: "Acción",
        releaseDate: "2005-02-11",
        favorite: false,
        cover: "",
    },
];