import React, { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';

// Ana sayfa
function Home() {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1>Hoşgeldiniz Kütüphaneye!</h1>
      <p>Menüden veya aşağıdaki butonlardan ilerleyebilirsiniz.</p>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/users')}>
          Üyeler
        </button>
        <button className="btn btn-success btn-lg" onClick={() => navigate('/books')}>
          Kitaplar
        </button>
        <button className="btn btn-warning btn-lg" onClick={() => navigate('/loans')}>
          Ödünç Verme
        </button>
      </div>
    </div>
  );
}

// (Users, Books, Loans ve Navbar bileşenleri aynı, öncekinden kopyala)

function Users({ users, addUser }) {
  const [newUser, setNewUser] = React.useState('');

  const handleAdd = () => {
    if (newUser.trim() === '') return;
    addUser(newUser);
    setNewUser('');
  };

  return (
    <div>
      <h2>Üyeler</h2>
      <ul className="list-group mb-3">
        {users.map((user) => (
          <li key={user.id} className="list-group-item">{user.name}</li>
        ))}
      </ul>
      <input
        className="form-control mb-2"
        placeholder="Yeni Üye Adı"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleAdd}>Üye Ekle</button>
    </div>
  );
}

function Books({ books, addBook }) {
  const [newBook, setNewBook] = React.useState('');

  const handleAdd = () => {
    if (newBook.trim() === '') return;
    addBook(newBook);
    setNewBook('');
  };

  return (
    <div>
      <h2>Kitaplar</h2>
      <ul className="list-group mb-3">
        {books.map((book) => (
          <li key={book.id} className="list-group-item">{book.title}</li>
        ))}
      </ul>
      <input
        className="form-control mb-2"
        placeholder="Yeni Kitap Adı"
        value={newBook}
        onChange={(e) => setNewBook(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleAdd}>Kitap Ekle</button>
    </div>
  );
}

function Loans({ users, books, loans, addLoan }) {
  const [loanUserId, setLoanUserId] = React.useState('');
  const [loanBookId, setLoanBookId] = React.useState('');
  const [loanDate, setLoanDate] = React.useState('');

  const handleAdd = () => {
    if (!loanUserId || !loanBookId || !loanDate) return;
    addLoan(loanUserId, loanBookId, loanDate);
    setLoanUserId('');
    setLoanBookId('');
    setLoanDate('');
  };

  return (
    <div>
      <h2>Ödünç Verme</h2>
      <ul className="list-group mb-3">
        {loans.map((loan) => {
          const user = users.find(u => u.id === loan.userId);
          const book = books.find(b => b.id === loan.bookId);
          return (
            <li key={loan.id} className="list-group-item">
              <strong>{user?.name}</strong> - <em>{book?.title}</em><br />
              <small>Tarih: {loan.date}</small>
            </li>
          );
        })}
      </ul>

      <select className="form-select mb-2" value={loanUserId} onChange={e => setLoanUserId(e.target.value)}>
        <option value="">Üye Seç</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>

      <select className="form-select mb-2" value={loanBookId} onChange={e => setLoanBookId(e.target.value)}>
        <option value="">Kitap Seç</option>
        {books.map(book => (
          <option key={book.id} value={book.id}>{book.title}</option>
        ))}
      </select>

      <input
        type="date"
        className="form-control mb-2"
        value={loanDate}
        onChange={e => setLoanDate(e.target.value)}
      />

      <button className="btn btn-success" onClick={handleAdd}>Ödünç Verme Ekle</button>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
      <div className="container">
        <NavLink className="navbar-brand" to="/">Kütüphane</NavLink>
        <div className="navbar-nav">
          <NavLink className="nav-link" to="/users">Üyeler</NavLink>
          <NavLink className="nav-link" to="/books">Kitaplar</NavLink>
          <NavLink className="nav-link" to="/loans">Ödünç Verme</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Ahmet Yılmaz' },
    { id: 2, name: 'Ayşe Demir' },
  ]);
  const [books, setBooks] = useState([
    { id: 1, title: 'Sefiller' },
    { id: 2, title: 'Suç ve Ceza' },
  ]);
  const [loans, setLoans] = useState([
    { id: 1, userId: 1, bookId: 2, date: '2025-06-10' },
  ]);

  const addUser = (name) => {
    setUsers([...users, { id: Date.now(), name }]);
  };

  const addBook = (title) => {
    setBooks([...books, { id: Date.now(), title }]);
  };

  const addLoan = (userId, bookId, date) => {
    setLoans([...loans, { id: Date.now(), userId: parseInt(userId), bookId: parseInt(bookId), date }]);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users users={users} addUser={addUser} />} />
          <Route path="/books" element={<Books books={books} addBook={addBook} />} />
          <Route path="/loans" element={<Loans users={users} books={books} loans={loans} addLoan={addLoan} />} />
        </Routes>
      </div>
    </>
  );
}