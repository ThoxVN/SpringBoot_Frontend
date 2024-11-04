// src/components/EditFarmForm.js
import React, { useState, useEffect } from 'react';
import { updateFarm } from '../services/farmService';

const EditFarmForm = ({ existingFarm ,onClose}) => {
    const [farm, setFarm] = useState(existingFarm);

    useEffect(() => {
        setFarm(existingFarm);
    }, [existingFarm]);

    const handleChange = (e) => {
        setFarm({
            ...farm,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        updateFarm(farm.id, farm)
            .then(response => {
                console.log("Farm đã được cập nhật:", response.data);
            })
            .catch(error => {
                console.error("Có lỗi xảy ra khi cập nhật farm:", error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>ID trang trại:</label>
                <input
                    type="text"
                    name="id"
                    value={farm.id}
                    onChange={handleChange}
                    readOnly
                />
            </div>
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
            <button type="submit">Cập nhật</button>
            <button type="button" onClick={onClose}>Hủy</button>
        </form>
    );
};

export default EditFarmForm;
