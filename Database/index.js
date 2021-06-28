const books = [
    {
        ISBN : "123ge58gh",
        title : "MERN",
        authors : [1,2],
        language : "English",
        pubDate : "2021-07-09",
        numOfPage : 225,
        category : ["fiction","programming","wed dev","tech"],
        publication : 1,
    },
    {
        ISBN : "123ge58ghio",
        title : "PYTHON",
        authors : [1,2],
        language : "English",
        pubDate : "2021-07-09",
        numOfPage : 225,
        category : ["fiction","wed dev","tech"],
        publication : 1,
    },

];





const authors = [
    {
        ids : 1,
        name : "Rukmini",
        books : ["123ge58gh","123ge58ghio"],
    },
    {
        ids : 2,
        name : "jyothi",
        books : ["123ge58gh"],
    },
];



const publications = [
    {
        ids : 1,
        name : "Chakra",
        books : ["123ge58ghio"],
    },
    {
        ids : 2,
        name: "Vickie Publications",
        books: ["123ge58gh"],
      },
];

module.exports = {books,authors,publications};