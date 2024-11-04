import React, { useEffect, useState } from 'react';
import { getAllFarms, deleteFarmById, getFarmById } from '../services/farmService';
import EditFarmForm from './EditFarmForm';
import AddFarmForm from './AddFarmForm';

const FarmList = () => {
    const [farms, setFarms] = useState([]);
    const [selectedFarm, setSelectedFarm] = useState(null); 
    const [isAdding, setIsAdding] = useState(false); 
    const [searchId, setSearchId] = useState(''); 
    const [searchResult, setSearchResult] = useState(null); 

    useEffect(() => {
        getAllFarms()
            .then(response => {
                setFarms(response.data);
            })
            .catch(error => {
                console.error("Có lỗi xảy ra:", error);
            });
    }, []);

    const handleDelete = (id) => {
        deleteFarmById(id)
            .then(() => {
                setFarms(farms.filter(farm => farm.id !== id)); 
            })
            .catch(error => {
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
        setFarms(farms.map(farm => (farm.id === updatedFarm.id ? updatedFarm : farm)));
        handleFormClose();
    };

    const handleAddFarm = (newFarm) => {
        setFarms([...farms, newFarm]);
        handleFormClose();
    };

    const handleSearch = () => {
        getFarmById(searchId)
            .then(response => {
                setSearchResult(response.data);
            })
            .catch(error => {
                console.error("Có lỗi xảy ra khi tìm kiếm:", error);
                setSearchResult(null); 
            });
    };

    return (
        <div>
            <h2>Danh sách Farms</h2>
            <div>
                <input 
                    type="text" 
                    placeholder="Nhập ID trang trại" 
                    value={searchId} 
                    onChange={(e) => setSearchId(e.target.value)} 
                />
                <button onClick={handleSearch}>Tìm kiếm</button>
            </div>

            <button onClick={() => setIsAdding(true)}>Thêm trang trại mới</button>

            {searchResult ? (
                <div>
                    <h3>Kết quả tìm kiếm</h3>
                    <p>{searchResult.name} - {searchResult.description}</p>
                    <button onClick={() => handleEdit(searchResult)}>Sửa</button>
                    <button onClick={() => handleDelete(searchResult.id)}>Xóa</button>
                </div>
            ) : (
                <ul>
                    {farms.map(farm => (
                        <li key={farm.id}>
                            {farm.image} - {farm.name} - {farm.description} - {farm.temperature} - {farm.humid} |
                            <button onClick={() => handleEdit(farm)}>Sửa</button>
                            <button onClick={() => handleDelete(farm.id)}>Xóa</button>
                        </li>
                    ))}
                </ul>
            )}          
            {selectedFarm && (
                <EditFarmForm
                    existingFarm={selectedFarm}
                    onClose={handleFormClose}
                    onSubmit={handleFormSubmit}
                />
            )}
            
            {isAdding && (
                <AddFarmForm
                    onClose={handleFormClose}
                    onSubmit={handleAddFarm}
                />
            )}
        </div>
    );
};

export default FarmList;
