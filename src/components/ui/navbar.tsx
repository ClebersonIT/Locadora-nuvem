// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li className="dropdown">
          <a href="#" className="dropbtn">Dropdown</a>
          <div className="dropdown-content">
            <Link href="/page1">
              <a>Page 1</a>
            </Link>
            <Link href="/page2">
              <a>Page 2</a>
            </Link>
          </div>
        </li>
      </ul>

      <style jsx>{`
        nav {
          background-color: #333;
          overflow: hidden;
        }

        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        li {
          float: left;
        }

        li a, .dropbtn {
          display: inline-block;
          color: white;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
        }

        li a:hover, .dropdown:hover .dropbtn {
          background-color: red;
        }

        .dropdown-content {
          display: none;
          position: absolute;
          background-color: #f9f9f9;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        }

        .dropdown-content a {
          color: black;
          padding: 12px 16px;
          display: block;
          text-decoration: none;
          text-align: left;
        }

        .dropdown-content a:hover {
          background-color: #ddd;
        }

        .dropdown:hover .dropdown-content {
          display: block;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
