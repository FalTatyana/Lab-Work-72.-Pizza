import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import { useEffect } from "react";
import { fetchOrders } from "../../../app/OrderSlice";

const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();

  const orders = useSelector((state: RootState) => state.cart.items);
  console.log("orders", orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="col-sm-6">
      <div className="card">
        <div className="card-body">
            <div>
              <p className="card-text">Order Title</p>
              <p className="card-text">Order price</p>
              <p className="card-text">Order Amount</p>
            </div>
          <button className="btn btn-primary">
            Complete order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
