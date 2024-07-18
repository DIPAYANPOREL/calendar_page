import React, { useState } from 'react';


const CustomToolbar = ({ label, onNavigate }) => {
    const [itemText, setItemText] = useState('month');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const handleMonthChange = (month) => {
        const monthIndex = months.indexOf(month);
        const targetDate = new Date(new Date().getFullYear(), monthIndex, 1);
        onNavigate('date', targetDate);
        setItemText(month);
    };
    return (
        <div className="toolbar-container">
            <h1 className='year-month'>{label}</h1>
            <div className="dropdown">
                <button className='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton'
                    data-bs-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                    {itemText}
                </button>
                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                    {months.map((month, index) => (
                        <li key={index}>
                            <button className='dropdown-item' onClick={() => handleMonthChange(month)}>
                                {month}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CustomToolbar;