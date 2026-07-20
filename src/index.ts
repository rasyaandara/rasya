import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;
app.use(express.json());

interface Book {
    id : number;
    title : string;
    author : string;
    year : number;
}

let books : Book[] = [];

app.get('/books', (req : Request, res : Response) => {
    res.status(200).json({ data : books });
});

app.get('/books', (req : Request, res : Response) => {
    const bookid = parseInt(String(req.params.id));
    const book = books.find(b => b.id === bookid);

    if (!book)  {
        return res.status(404).json({ message : 'Buku tidak ditemukan'});
    }
    res.status(200).json({ data : book});
});

app.post('/books', (req : Request, res : Response) =>{
    const { title, author, year} = req.body as Book;

    const newBook : Book = {
        id : books.length > 0 ? (books[books.length - 1]?.id ?? 0) + 1 : 1,
        title,
        author,
        year
    };
    books.push(newBook);
res.status(201).json({ message : 'buku berhasil ditambahkan', data : newBook});
})

app.put('/books/:id', (req : Request, res : Response) => {
const bookid = parseInt(String(req.params.id));
const { title, author, year } = req.body as Book;

const index = books.findIndex(b => b.id === bookid);

if (index === -1){
    return res.status(404).json({ message : 'buku tidak ditemukan'});
}
books [index] = { id : bookid, title, author, year};
res.status(200).json ({ message : 'buku berhasil diupdate', data : books[index]});
});

app.delete('/books/:id', (req : Request, res : Response) => {
    const bookid = parseInt(String(req.params.id));
    const index = books.findIndex (b => b.id === bookid);

    if (index === -1){
        return res.status(404).json({ message : 'buku tidak ditemukan'});
    }
    books.splice(index, 1);
    res.status(200).json({ message : 'buku berhasil dihapus'});
});

app.listen(PORT, () =>{
    console.log('server jalan di http://localhost:$(PORT)');
});

