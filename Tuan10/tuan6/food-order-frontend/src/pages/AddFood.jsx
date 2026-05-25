import { useState } from "react";
import { addFood } from "../api/foodApi";
import { useLocation, useNavigate } from "react-router-dom";
import { updateFood } from "../api/foodApi";
import { useEffect } from "react";

export default function AddFood() {
  const location = useLocation();
  const navigate = useNavigate();

  const editingFood = location.state;

  const [food, setFood] = useState({
    name: "",
    price: "",
    category: "",
    description: ""
  });

  useEffect(() => {
    if (editingFood) {
      setFood(editingFood);
    }
  }, [editingFood]);

  const handleSubmit = async () => {
    if (editingFood) {
      // 👉 UPDATE
      await updateFood(editingFood.id, food);
      alert("Updated!");
    } else {
      // 👉 ADD
      await addFood(food);
      alert("Added!");
    }

    navigate("/"); // quay lại list
  };

  return (
    <div className="addfood-container">
      <h2>{editingFood ? "Edit Food" : "Add Food"}</h2>

      <input
        placeholder="Name"
        value={food.name}
        onChange={(e) =>
          setFood({ ...food, name: e.target.value })
        }
      />
      <input
        placeholder="Price"
        value={food.price}
        onChange={(e) =>
          setFood({ ...food, price: e.target.value })
        }
      />
      <input
        placeholder="Category"
        value={food.category}
        onChange={(e) =>
          setFood({ ...food, category: e.target.value })
        }
      />
      <input
        placeholder="Description"
        value={food.description}
        onChange={(e) =>
          setFood({ ...food, description: e.target.value })
        }
      />

      <button onClick={handleSubmit}>
        {editingFood ? "Update" : "Add"}
      </button>
    </div>
  );
}