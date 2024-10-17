import React, { useEffect, useState } from 'react';
import { getAllFarms, deleteFarmById } from '../services/farmService';

const FarmList = () => {
    const [farms, setFarms] = useState([]);

    useEffect(() => {
        // Gọi API để lấy danh sách farms khi component được render
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
                setFarms(farms.filter(farm => farm.id !== id)); // Cập nhật lại danh sách sau khi xóa
            })
            .catch(error => {
                console.error("Có lỗi xảy ra khi xóa:", error);
            });
    };

    return (
        <div>
            <h2>Danh sách Farms</h2>
            <ul>
                {farms.map(farm => (
                    <li key={farm.id}>
                        {farm.name} - {farm.description}
                        <button onClick={() => handleDelete(farm.id)}>Xóa</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FarmList;