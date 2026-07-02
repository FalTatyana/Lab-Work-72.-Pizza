import { Link, NavLink } from "react-router-dom"

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
    <div className="container d-flex justify-content-between">
      <Link className="navbar-brand" to={'/admin/dishes'}>Turtle Pizza Admin</Link>
      <div>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to={'/admin/dishes'}>Dishes</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={'/admin/orders'}>Orders</NavLink>
          </li>
        </ul>
      </div>

      </div>
    </div>
  </nav>
  )
}

export default Header