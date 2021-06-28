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
        id : 1,
        name : "Rukmini",
        books : ["123ge5"],
    },
    {
        id : 2,
        name : "Jyothi",
        books : ["123ge5"],
    },
];



const publications = [
    {
        id : 1,
        name : "Chakra",
        books : ["123ge5"],
    },
];

module.exports = {books,authors,publications};