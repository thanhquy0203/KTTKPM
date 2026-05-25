import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function FoodItem({ food, onAdd, onDelete, onEdit }) {
  const { user } = useContext(UserContext);

  return (
    <div className="food-card">
      <h3>{food.name}</h3>
      <p className="price">{food.price}₫</p>
      <p>📂 {food.category}</p>
      <p>{food.description}</p>

      <div className="btn-group">
        <button className="btn" onClick={() => onAdd(food)}>
          Add to cart
        </button>

        {user?.role === "ADMIN" && (
          <>
            <button
              className="btn btn-outline"
              style={{ borderColor: "#e74c3c", color: "#e74c3c" }}
              onClick={() => onDelete(food.id)}
            >
              Delete
            </button>

            <button
              className="btn btn-outline"
              style={{ borderColor: "#f39c12", color: "#f39c12" }}
              onClick={() => onEdit(food)}
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
}