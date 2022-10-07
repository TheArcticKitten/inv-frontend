import { useState, useEffect } from 'react';
import axios from 'axios';
//import { WarehouseForm } from '../Form/WarehouseForm';
/*
    {
        "_id": "633f2c1b99ecfe9cf74f27ce",
        "warehouseId": 0,
        "name": "Flagship",
        "storageCapacity": 100,
        "currentCapacity": 0,
        "location": "Houston, Texas",
        "__v": 0
    },
*/
const Warehouse = ({warehouse: {_id, warehouseId, name, storageCapacity, currentCapacity, location, __v}}) => {

    // const [isEdit, toggleIsEdit] = useState(false);
    return (
        <tr>
            <td className="row-item">{warehouseId}</td>
            <td className="row-item">{name}</td>
            <td className="row-item">{location}</td>
            <td className="row-item">{storageCapacity}</td>
            <td className="row-item">{currentCapacity}</td>
        </tr>
    );
}

export const WarehouseList = () => {
    
    // It will initialize to an empty array rather than undefined
    const [warehouseList, setWarehouseList] = useState([]);
    
    // React does NOT support making this callback asynchronous
    // So you MUST use .then()/.catch() OR have it call another async function to use await
    useEffect(() => {
        // Axios returns a fulfilled promise if the status code is < 400
        // and a rejected promise when >= to 400 
        
        // Move this to store. Get the res.data and use dispatch(setWarehouseList(res.data))
        axios.get('http://localhost:8080/warehouse')
            .then(res => { setWarehouseList(res.data); console.log(res.data) })
            .catch(err => console.error(err)); // This could easily be to render an error display
    }, []);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Warehouse ID</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Storage Capacity</th>
                        <th>Current Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    {warehouseList.map(warehouse => <Warehouse key={warehouse._id} warehouse={warehouse}/>)}
                </tbody>
                
            </table>
        </>
    );
}