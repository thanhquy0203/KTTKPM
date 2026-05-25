import { useEffect, useState, useContext } from "react";
import { getFoods, deleteFood, updateFood } from "../api/foodApi";
import FoodItem from "../components/FoodItem";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function FoodList() {
  const [foods, setFoods] = useState([]);
  const [editingFood, setEditingFood] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const fetchFoods = async () => {
    const res = await getFoods();
    setFoods(res.data);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleDelete = async (id) => {
    await deleteFood(id);
    fetchFoods();
  };

  const handleEdit = (food) => {
    navigate("/add-food", { state: food });
  };

  const handleUpdate = async () => {
    await updateFood(editingFood.id, editingFood);
    setEditingFood(null);
    fetchFoods();
  };
  const handleAddToCart = (food) => {
    addToCart(food);
    alert(`Đã thêm ${food.name} vào giỏ hàng!`);
  };

  return (
    <div className="container">
      <h2>Menu</h2>

      {editingFood && user?.role === "ADMIN" && (
        <div className="addfood-container">
          <h3>Edit Food</h3>
          <input
            value={editingFood.name}
            onChange={(e) =>
              setEditingFood({ ...editingFood, name: e.target.value })
            }
          />
          <input
            value={editingFood.price}
            onChange={(e) =>
              setEditingFood({ ...editingFood, price: e.target.value })
            }
          />
          <input
            value={editingFood.category}
            onChange={(e) =>
              setEditingFood({ ...editingFood, category: e.target.value })
            }
          />
          <input
            value={editingFood.description}
            onChange={(e) =>
              setEditingFood({ ...editingFood, description: e.target.value })
            }
          />
          <button className="btn" onClick={handleUpdate}>
            Update
          </button>
        </div>
      )}

      <div className="food-grid">
        {foods.map((food) => (
          <FoodItem
            key={food.id}
            food={food}
            onAdd={handleAddToCart}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}