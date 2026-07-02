import { NavLink } from "react-router-dom"
import DishItem from "../../components/DishItem/DishItem"
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { useEffect } from "react";
import { deleteDishes, fetchDishes } from "../../app/DishesSlice";
import Spinner from "../../components/Spinner/Spinner";

const DishesList = () => {

    const dispatch = useDispatch<AppDispatch>();
    const dishes = useSelector((state: RootState) => state.dishes.dishes);
    const loading = useSelector(
        (state: RootState) => state.dishes.loading
    );

    useEffect(() => {
        dispatch(fetchDishes());
    }, [dispatch]);

    if (loading) {
        return <Spinner />;
    }

    const handleDelete = async (id: string) => {
        await dispatch(deleteDishes(id))
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Dishes</h5>
                <NavLink to={'/admin/add-dish'} type="button" className="btn btn-outline-primary">Add new dish</NavLink>
            </div>
            <div className="d-flex flex-wrap">
                {dishes.map(dish => (
                    <DishItem
                        key={`${dish.title}-${Date.now()}`}
                        title={dish.title}
                        price={dish.price}
                        url={dish.url}
                        handleDelete={() => handleDelete(dish.id)}
                    />
                ))}
            </div>
        </>
    )
}

export default DishesList

