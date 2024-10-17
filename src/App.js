// src/App.js
import React from 'react';
import FarmList from './components/FarmList';
import FarmForm from './components/FarmForm';

function App() {
    return (
        <div className="App">
            <h1>Quản lý Trang Trại</h1>
            <FarmForm />
            <FarmList />
        </div>
    );
}

export default App;
