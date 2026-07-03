import { useState, type ChangeEvent, type SubmitEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { addDish, fetchDishes, type Dish, editDish } from "../../../app/DishesSlice";
import type { AppDispatch } from "../../../app/store";

interface Props {
    isEdit?: boolean
    dish?: Dish
};

const FormAddDish = ({ isEdit = false, dish }: Props) => {

    const [form, setForm] = useState<Dish>({
        id: '',
        title: '',
        price: '',
        url: '',
    });

    useEffect(() => {
        if (dish) {
            setForm(dish);
        }
    }, [dish]);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isEdit) {
            await dispatch(editDish(form))
            await dispatch(fetchDishes());
            navigate("/admin/dishes");
            return;
        };
        
        if (!form.url.trim() || !form.title.trim() || !form.price.trim()) {
            toast.error('Enter all data')
            return;
        };

        const newDish = {
            title: form.title,
            url: form.url,
            price: form.price
        };

        await dispatch(addDish(newDish));
        await dispatch(fetchDishes());
        navigate("/admin/dishes");
    }

    return (
        <>
            <h5 className="mb-3">{isEdit ? "Edit dish" : "Add new dish"}</h5>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputEmail1">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter title"
                        name="title"
                        id="title"
                        onChange={handleChange}
                        value={form.title}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputPassword1">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Price"
                        name="price"
                        id="price"
                        onChange={handleChange}
                        value={form.price}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputEmail1">Image</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter image url"
                        name="url"
                        id="url"
                        onChange={handleChange}
                        value={form.url}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">{isEdit ? "Edit" : "Add"}</button>
            </form>
        </>
    )
}

export default FormAddDish