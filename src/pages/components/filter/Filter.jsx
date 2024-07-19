import React, { useEffect, useState } from 'react';
import {Form} from 'react-bootstrap'

function Filter({activities, onSelectedAtivities}){
    const typeActivities = [... new Set(activities.map(activities => activities.type))].filter(type=> type!== '');

    const [typeSelected, setTypeSelected] = useState([]);

    const toggleType = (type) =>{
        if(typeSelected.includes(type)){
            setTypeSelected(typeSelected.filter(t => t !== type));
        } else {
            setTypeSelected([...typeSelected, type]);
        }
    };

    useEffect(() => {
        if(typeSelected.length === 0 ){
            onSelectedAtivities(activities);
        } else {
            const eventsFilters = activities.filter(activities => typeSelected.includes(activities.type));
            onSelectedAtivities(eventsFilters);
        }
    },[typeSelected, activities, onSelectedAtivities]);

    return(
        typeActivities.length > 0&&(
            <div className="p-3 rounded border border-white mt-3" >
                <div    className='ps-1' style={{maxHeight:'28vh', overflowY: 'auto'}}>
                    {typeActivities.map(type =>(
                            <Form.Check
                            key={type}
                            label={type}
                            checked={typeSelected.includes(type)}
                            onChange={() => toggleType(type)}
                            className='mr-3 mb-3'/>
                    ))}
                </div>
                <button className='btn btn-outline-secondary btn-hover-gray' onClick={()=> setTypeSelected([])}>Clear filter</button>
            </div>
        )

    )
}

export default Filter;