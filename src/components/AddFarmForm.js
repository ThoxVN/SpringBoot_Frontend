// src/components/AddFarmForm.js
import React, { useState } from "react";
import { addFarm } from "../services/farmService";
import "./FarmForm.css"

const AddFarmForm = ({ onClose }) => {
  const [farm, setFarm] = useState({
    name: "",
    description: "",
    image: "",
    temperature: "",
    humid: "",
  });

  const handleChange = (e) => {
    setFarm({
      ...farm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addFarm(farm)
      .then((response) => {
        console.log("Farm mới đã được thêm:", response.data);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi thêm farm:", error);
      });
    onClose();
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="farm-form">
      <div className="form-group">
        <label>Tên trang trại:</label>
        <input
          type="text"
          name="name"
          value={farm.name}
          onChange={handleChange}
          className="form-input"
          placeholder="Nhập tên trang trại"
        />
      </div>
      <div className="form-group">
        <label>Mô tả:</label>
        <input
          type="text"
          name="description"
          value={farm.description}
          onChange={handleChange}
          className="form-input"
          placeholder="Nhập mô tả"
        />
      </div>
      <div className="form-group">
        <label>Ảnh URL:</label>
        <input
          type="text"
          name="image"
          value={farm.image}
          onChange={handleChange}
          className="form-input"
          placeholder="Nhập URL ảnh"
        />
      </div>
      <div className="form-group">
        <label>Nhiệt độ:</label>
        <input
          type="text"
          name="temperature"
          value={farm.temperature}
          onChange={handleChange}
          className="form-input"
          placeholder="Nhập nhiệt độ"
        />
      </div>
      <div className="form-group">
        <label>Độ ẩm:</label>
        <input
          type="text"
          name="humid"
          value={farm.humid}
          onChange={handleChange}
          className="form-input"
          placeholder="Nhập độ ẩm"
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="submit-button">
          Thêm mới
        </button>
        <button type="button" onClick={onClose} className="cancel-button">
          Hủy
        </button>
      </div>
    </form>
  );
};

export default AddFarmForm;
