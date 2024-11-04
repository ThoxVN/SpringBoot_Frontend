// src/components/AddFarmForm.js
import React, { useState } from 'react';
import { addFarm } from '../services/farmService';

const AddFarmForm = ({onClose}) => {
    const [farm, setFarm] = useState({
        name: '',
        description: '',
        image: '',
        temperature: '',
        humid: ''
    });

    const handleChange = (e) => {
        setFarm({
            ...farm,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        addFarm(farm)
            .then(response => {
                console.log("Farm mới đã được thêm:", response.data);
            })
            .catch(error => {
                console.error("Có lỗi xảy ra khi thêm farm:", error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Tên trang trại:</label>
                <input
                    type="text"
                    name="name"
                    value={farm.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Mô tả:</label>
                <input
                    type="text"
                    name="description"
                    value={farm.description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Ảnh URL:</label>
                <input
                    type="text"
                    name="image"
                    value={farm.image}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Nhiệt độ:</label>
                <input
                    type="text"
                    name="temperature"
                    value={farm.temperature}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Độ ẩm:</label>
                <input
                    type="text"
                    name="humid"
                    value={farm.humid}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Thêm mới</button>
            <button type="button" onClick={onClose}>Hủy</button>
        </form>
    );
};

export default AddFarmForm;
