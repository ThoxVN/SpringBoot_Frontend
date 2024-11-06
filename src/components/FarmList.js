import React, { useEffect, useState } from "react";
import {
  getAllFarms,
  deleteFarmById,
  getFarmById,
} from "../services/farmService";
import EditFarmForm from "./EditFarmForm";
import AddFarmForm from "./AddFarmForm";
import "./FarmList.css"; // Assuming you create a CSS file for styles

const FarmList = () => {
  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    getAllFarms()
      .then((response) => {
        setFarms(response.data);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra:", error);
      });
  }, []);

  const handleDelete = (id) => {
    deleteFarmById(id)
      .then(() => {
        setFarms(farms.filter((farm) => farm.id !== id));
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi xóa:", error);
      });
  };

  const handleEdit = (farm) => {
    setSelectedFarm(farm);
  };

  const handleFormClose = () => {
    setSelectedFarm(null);
    setIsAdding(false);
    setSearchResult(null);
  };

  const handleFormSubmit = (updatedFarm) => {
    setFarms(
      farms.map((farm) => (farm.id === updatedFarm.id ? updatedFarm : farm))
    );
    handleFormClose();
  };

  const handleAddFarm = (newFarm) => {
    setFarms([...farms, newFarm]);
    handleFormClose();
  };

  const handleSearch = () => {
    getFarmById(searchId)
      .then((response) => {
        setSearchResult(response.data);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi tìm kiếm:", error);
        setSearchResult(null);
      });
  };

  return (
    <div className="farm-list-container">
      <h2>Danh sách Farms</h2>

      <div className="search-section">
        <input
          type="text"
          placeholder="Nhập ID trang trại"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Tìm kiếm
        </button>
        <button onClick={() => setIsAdding(true)} className="add-button">
          Thêm trang trại mới
        </button>
      </div>

      {selectedFarm && (
        <EditFarmForm
          existingFarm={selectedFarm}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      )}

      {isAdding && (
        <AddFarmForm onClose={handleFormClose} onSubmit={handleAddFarm} />
      )}

      {searchResult ? (
        <div className="search-result">
          <h3>Kết quả tìm kiếm</h3>
          <p>
            {searchResult.name} - {searchResult.description}
          </p>
          <div className="result-actions">
            <button
              onClick={() => handleEdit(searchResult)}
              className="edit-button"
            >
              Sửa
            </button>
            <button
              onClick={() => handleDelete(searchResult.id)}
              className="delete-button"
            >
              Xóa
            </button>
          </div>
        </div>
      ) : (
        <ul className="farm-list">
          {farms.map((farm) => (
            <li key={farm.id} className="farm-item">
              <div className="farm-info">
                <img src={farm.image} alt={farm.name} className="farm-image" />
                <div>
                  <h4>{farm.name}</h4>
                  <p>{farm.description}</p>
                  <p>
                    Nhiệt độ: {farm.temperature}°C - Độ ẩm: {farm.humid}%
                  </p>
                </div>
              </div>
              <div className="farm-actions">
                <button
                  onClick={() => handleEdit(farm)}
                  className="edit-button"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(farm.id)}
                  className="delete-button"
                >
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default FarmList;
