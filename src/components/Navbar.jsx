import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ loggedInUser, setLoggedInUser }) {
  const navigate = useNavigate();

  const logout = () => {
    setLoggedInUser(null);
    navigate("/login");
  };

  return (
    <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
      <Link to="/users" style={{ marginRight: 10 }}>Kullanıcılar</Link>
      <Link to="/books" style={{ marginRight: 10 }}>Kitaplar</Link>
      <Link to="/borrows" style={{ marginRight: 10 }}>Ödünçler</Link>

      {loggedInUser ? (
        <>
          <span style={{ marginLeft: 20 }}>
            Hoşgeldin, {loggedInUser.name}
          </span>
          <button onClick={logout} style={{ marginLeft: 10 }}>
            Çıkış Yap
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginLeft: 20, marginRight: 10 }}>Giriş</Link>
          <Link to="/register">Kayıt Ol</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
