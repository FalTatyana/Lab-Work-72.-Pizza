import { NavLink } from "react-router-dom"

interface Props {
    title: string
    price: string
    url: string
    id : string
    handleDelete: () => void
}

const DishItem = ({ title, price, url, handleDelete, id }: Props) => {

    return (
        <div className="card m-3" style={{ width: 200 }}>
            <img src={url} className="card-img-top" alt="dish" style={{ width: 200, height: 200 }} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{price} KGS</p>
                <NavLink to={`/admin/edit-dish/${id}`} className="btn btn-outline-primary me-3">Edit</NavLink>
                <button onClick={handleDelete} className="btn btn-outline-danger">Delete</button>
            </div>
        </div>
    )
}

export default DishItem
