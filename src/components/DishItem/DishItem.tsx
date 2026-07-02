import { NavLink } from "react-router-dom"

interface Props {
    title: string
    price: string
    url: string
    handleDelete: () => void
}

const DishItem = ({ title, price, url, handleDelete }: Props) => {

    return (
        <div className="card me-3 mb-3" style={{ width: 200 }}>
            <img src={url} className="card-img-top" alt="dish" style={{ width: 200, height: 200 }} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{price} kgs</p>
                <NavLink to={'/edit'} className="btn btn-primary me-3">Edit</NavLink>
                <button onClick={handleDelete} className="btn btn-danger">Delete</button>
            </div>
        </div>
    )
}

export default DishItem

function dispatch(arg0: any) {
    throw new Error("Function not implemented.")
}
