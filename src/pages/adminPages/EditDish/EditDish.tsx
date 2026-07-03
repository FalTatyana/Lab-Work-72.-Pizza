import { useParams } from "react-router-dom";
import FormAddDish from "../FormAddDish/FormAddDish"
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import Spinner from "../../../components/Spinner/Spinner";


const EditDish = () => {

    const { id } = useParams();
    const dish = useSelector((state: RootState) => state.dishes.dishes);
    const dishToEdit = dish.find(c => c.id === id);

    if (!dishToEdit) {
        return <Spinner />;
    }

    return (
        <>
            <FormAddDish isEdit={true} dish={dishToEdit} />
        </>
    )
}

export default EditDish