const {createRoot} = ReactDOM;
const { useState, Fragment } = React;

function Components()
{
    const [count, setCount] = useState(0);

    const incrementCount = () => {
        setCount(count + 1);
    };

    const decrementCount = () => {
        setCount(count - 1);
    }

    const resetCount = () => {
        setCount(0);
    }

    const disabled_button = count === 0;

    return (
        <div>
            <p> Count : {count}</p>
            <button onClick={incrementCount}>Increment</button>
            <button onClick={decrementCount} disabled={disabled_button}>Decrement</button>
            <button onClick={resetCount} disabled={disabled_button}>Reset</button>
        </div>
    );
}



class Books {
    constructor(bookList) {
        this.bookList = bookList;
    }
    
    
    addBook(item) {
        const exists = this.bookList.find(book => book.toLowerCase() === item.toLowerCase());
        if (exists) {
            return `${item} already exists.`;
        } else {
            this.bookList.push(item);
            return `${item} added.`;
        }
    }

    removeBook(item) {
        const book_index = this.bookList.findIndex(book => book.toLowerCase() === item.toLowerCase());
        if (book_index >= 0) {
            this.bookList.splice(book_index, 1);
        } else {
            alert("Book Doesn't exist!");
        }
    }
    
    changeBook(old_item, new_item) {
        const book_index = this.bookList.findIndex(book => book.toLowerCase() === old_item.toLowerCase());
        this.bookList[book_index] = new_item;
    }
}

const book_items = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : [];
const books = new Books(book_items);
function ShowBooks() {
    const [book, setBook] = useState("");
    
    const handleDeleteBook = (item) => {
        books.removeBook(item);
        localStorage.setItem("books", JSON.stringify(book_items));
        location.reload();
    }
    
    const handleAddBook = () => {
        if (book.trim() !== "") {
            books.addBook(book);
            setBook("");
            localStorage.setItem("books", JSON.stringify(book_items));
            location.reload();
        }
    }
    
    const handleKeyPress = (event) => {
        if (event.key === "Enter")
        handleAddBook();
}

return (
        <Fragment>
            <h1>REACT BOOK LIST</h1>
            <input type="text" value={book} onChange={(event) => setBook(event.target.value)} onKeyPress={handleKeyPress} />
            <button onClick={handleAddBook} >Add Book</button>
            {book_items.map((item_book, index) => (
                <h3 key={`book_${index}`}>{item_book}
                    <button onClick={() => handleDeleteBook(item_book)}>Delete</button>
                </h3>
            ))}
        </Fragment>
    );
}


function App() {
    return (
        <div>
            <div>
            <h2>React Counter Example</h2>
                {Array.from({length: 5}, (_, i) => (
                    <Components key={i} />
                    ))
                }
            </div>
            <div>
                <ShowBooks/>
            </div>
        </div>
    );
}

const root = document.querySelector('#root');
const rootContainer = createRoot(root);
rootContainer.render(<App/>);