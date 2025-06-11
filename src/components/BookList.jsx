import React from "react";

function BookList({ books }) {
  return (
    <div>
      <h2>Kitap Listesi</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} — {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
