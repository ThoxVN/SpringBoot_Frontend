// src/App.js
import React from 'react';
import FarmList from './components/FarmList';


function App() {
    return (
        <div className="App">
        <h1 style={{
        textAlign: 'center',
        color: '#4CAF50',
        fontSize: '2.5em',
        fontWeight: 'bold',
        marginBottom: '20px',
        padding: '10px',
        borderBottom: '2px solid #4CAF50'
        }}>
    Quản lý Trang Trại
</h1>
            
            <FarmList />
        </div>
    );
}

export default App;
