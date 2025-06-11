import React from "react";

function BorrowList({ borrows, users, books }) {
  return (
    <div>
      <h2>Ödünç Kitaplar</h2>
      <ul>
        {borrows.map((borrow, idx) => {
          const user = users.find((u) => u.id === borrow.userId);
          const book = books.find((b) => b.id === borrow.bookId);

          return (
            <li key={idx}>
              {user ? user.name : "Bilinmeyen Kullanıcı"} &gt; {book ? book.title : "Bilinmeyen Kitap"} &nbsp;
              <span>({borrow.borrowDate})</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BorrowList;
