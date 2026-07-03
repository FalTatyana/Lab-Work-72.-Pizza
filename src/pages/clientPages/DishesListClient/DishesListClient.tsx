import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import { useEffect, useState } from "react";
import { fetchDishes, type Dish } from "../../../app/DishesSlice";
import Spinner from "../../../components/Spinner/Spinner";
import { addToCart } from "../../../app/cartSlice";
import Modal from "../../../components/Modal/Modal";

const DishesListClient = () => {
  const dispatch = useDispatch<AppDispatch>();
  const dishes = useSelector((state: RootState) => state.dishes.dishes);
  const loading = useSelector((state: RootState) => state.dishes.loading);
  const items = useSelector((state: RootState) => state.cart.items);

  const sum = items.reduce(
    (acc, item) => acc + Number(item.price) * item.amount,
    0
  );

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  const handleClick = (dish: Dish) => {
    dispatch(addToCart(dish));
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOrder = () => {
    setIsOpen(false);
  };

  return (
    <>
      <h5>Client menu</h5>
      <div className="d-flex flex-wrap">
        {dishes.map((dish) => (
          <div
            onClick={() => handleClick(dish)}
            key={dish.id}
            className="card me-4 mb-3"
            style={{ width: 200, cursor: "pointer" }}
          >
            <img
              className="card-img-top"
              src={dish.url}
              alt="dish"
              style={{ width: 200, height: 200 }}
            />
            <div className="card-body">
              <h5 className="card-title">{dish.title}</h5>
              <p className="card-text">{dish.price} KGS</p>
            </div>
          </div>
        ))}
      </div>
      <div className="card text-center mt-3 mb-3">
        <div className="card-header">Total order summ</div>
        <div className="card-body">
          <h5 className="card-title">Total summ is: ${sum} KGS</h5>
          <button
            className="btn btn-primary"
            onClick={openModal}
            disabled={items.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} handleOrder={handleOrder} />
    </>
  );
};

export default DishesListClient;
