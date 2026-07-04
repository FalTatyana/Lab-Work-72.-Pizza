import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../app/store";
import { postOrder, removeFromCart } from "../../app/cartSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const items = useSelector((state: RootState) => state.cart.items);

  const total = items.reduce(
    (acc, item) => acc + Number(item.price) * item.amount,
    0
  );

  const handleDelete = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleOrder = async () => {
    await dispatch(postOrder(items));
    onClose();
  };

  return (
    <>
      {isOpen && <div className="modal-backdrop fade show"></div>}
      {isOpen && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Your order</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={onClose}
                ></button>
              </div>
              <div className="modal-body">
                {items.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <>
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="d-flex justify-content-between mb-2"
                      >
                        <span>
                          {item.title} × {item.amount}
                        </span>
                        <div>
                          <span>{Number(item.price) * item.amount} KGS</span>
                          <button
                            type="button"
                            className="btn btn-outline-danger ms-3"
                            onClick={() => handleDelete(item.id)}
                          >
                            <i className="bi bi-trash3"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                    <hr />
                    <h5>Total: {total} KGS</h5>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    onClose();
                    navigate(`/`);
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleOrder}
                  type="button"
                  className="btn btn-outline-danger"
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
