import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/dishes.css";
import "../index.css";

const Dishes = () => {
  const [selectedDishType, setselectedDishType] = useState("pizza");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const onSubmit = data => alert(JSON.stringify(data));
  const onSubmit = (data) => {
    fetch("https://frosty-wood-6558.getsandbox.com:443/dishes", {
      method: "POST",
      body: JSON.stringify(data),
    });
    alert("Success! You send Form !");
  };
  const Dish_types = [
    {
      id: "pizza",
      label: "Pizza",
    },
    {
      id: "soup",
      label: "Soup",
    },
    {
      id: "sandwich",
      label: "Sandwich",
    },
  ];
  console.log("errors", errors);
  const PizzaOptions = () => {
    if (selectedDishType !== "pizza") return null;

    return (
      <>
        <div className="form-group">
          <input
            className="form-input"
            type="number"
            step="1"
            {...register("no_of_slices", { required: true })}
            defaultValue="1"
          />
          <label className="form-label"># of slices </label>
        </div>
        <div className="form-group">
          <input
            className="form-input"
            type="number"
            step="0.01"
            {...register("diameter", { required: true })}
            defaultValue="6"
          />
          <label className="form-label">Diameter </label>
        </div>
      </>
    );
  };

  const SoupOptions = () => {
    if (selectedDishType !== "soup") return null;

    return (
      <>
        <div className="form-group">
          <input
            className="form-input"
            type="range"
            min="1"
            max="10"
            step="1"
            {...register("spiciness_scale", {
              required: true,
              min: 1,
              max: 10,
            })}
            defaultValue="5"
          />
          <label className="form-label">Spiciness Scale</label>
        </div>
      </>
    );
  };

  const SandwichOptions = () => {
    if (selectedDishType !== "sandwich") return null;

    return (
      <>
        <div className="form-group">
          <input
            className="form-input"
            type="number"
            step="1"
            {...register("slices_of_bread", { required: true })}
            defaultValue="2"
          />
          <label className="form-label"># of slices</label>
        </div>
      </>
    );
  };
  return (
    <div className="dish">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dish-form">
          <h2 className="form-title">Dishes Form</h2>
          <p className="error">
            {errors.name?.type === "required" && "Dish Name is required"}
          </p>
          <div className="form-group">
            <input
              className="form-input"
              type="text"
              {...register("name", { required: true })}
            />
            <label className="form-label">Dish name</label>
          </div>
          <p className="error">
            {errors.preparation_time?.type === "required" && "Time is required"}
          </p>
          <div className="form-group">
            <input
              className="form-input-2"
              type="time"
              step="1"
              {...register("preparation_time", { required: true })}
              defaultValue="00:00:00"
            />
            <label className="form-label">Time</label>
          </div>
          <div className="form-group">
            <select
              className="form-input-2"
              value={selectedDishType}
              {...register("type", { required: true })}
              onChange={(e) => {
                const selectedType = e.target.value;
                setselectedDishType(selectedType);
              }}
            >
              {Dish_types.map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
            <label className="form-label">Dish Type</label>
          </div>
          <PizzaOptions />
          <SoupOptions />
          <SandwichOptions />
          <div className="input-field">
            <button className="form-btn" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Dishes;
