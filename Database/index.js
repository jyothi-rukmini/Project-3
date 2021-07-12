const books = [
    {
        ISBN : "123ge58gh",
        title : "MERN",
        authors : [1,2],
        language : "English",
        pubDate : "2021-07-09",
        numOfPage : 225,
        category : ["fiction","programming","web dev","tech"],
        publications : 1
    },
    {
        ISBN : "123ge58ghio",
        title : "PYTHON",
        authors : [1,2],
        language : "English",
        pubDate : "2021-07-09",
        numOfPage : 225,
        category : ["fiction","web dev","tech"],
        publications : 2
    }

];





const authors = [
    {
        id : 1,
        name : "Rukmini",
        books : ["123ge58gh","123ge58ghio"]
    },
    {
        id : 2,
        name : "Jyothi",
        books : ["123ge58gh"]
    },
];



const publications = [
    {
        ids : 1,
        name : "Chakra",
        books : ["123ge58ghio"]
    },
    {
        ids : 2,
        name: "Vickie Publications",
        books: ["123ge58gh"]
    }
];

module.exports = {books,authors,publications};