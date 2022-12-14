import { useState, useEffect } from 'react';
import axios from 'axios';
import { EntityForm } from '../Form/EntityForm';

// Axios allows us to fire off HTTP requests to some API
// Before axios/fetch devs had to rely on XMLHttpRequest

    /**
     * For UPDATE AND DELETE operations:
     * 
     * PUT: 
     *      Have two modes to your table row, update mode and not updating (isEdit) state
     *      Use conditional rendering to render the table as normal if !isEdit
     *      If isEdit is true, instead, display a altered table where each data is an input
     *      Or create a form/modal that updates a given Entity when you click on the edit button
     * 
     * DELETE:
     *      Add a delete button to the table row and clicking on it extract the _id from the Entity object
     *      and shoots off a DELETE http request using axios. From there, manually the remove the Entity
     *      from the list OR refetch data 
     */

const Entity = ({Entity: { entityCount, entityDesc, entityId,  entityName,  entitySize, imageUrl, warehouseId,  __v, _id}}) => {
    return (
        <tr>
            <td className="row-item">{entityName}</td>
            <td className="row-item">{entityId}</td>
            <td className="row-item">{warehouseId}</td>
            <td className="row-item">{entityCount}</td>
            <td className="row-item"><img height="100" src={imageUrl} alt={entityName}/></td>
        </tr>
    );
}


export const EntityList = () => {
    
    // It will initialize to an empty array rather than undefined
    const [EntityList, setEntityList] = useState([]);
    
    // React does NOT support making this callback asynchronous
    // So you MUST use .then()/.catch() OR have it call another async function to use await
    useEffect(() => {
        // Axios returns a fulfilled promise if the status code is < 400
        // and a rejected promise when >= to 400 
        
        // Move this to store. Get the res.data and use dispatch(setEntityList(res.data))
        axios.get('http://localhost:8080/entity')
            .then(res => { setEntityList(res.data); console.log(res.data) })
            .catch(err => console.error(err)); // This could easily be to render an error display
    }, []);

   
    return (
        <>
            <EntityForm setEntityList={setEntityList}/>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Entity ID</th>
                        <th>Warehouse ID</th>
                        <th>Unit Count</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {EntityList.map(Entity => <Entity key={Entity._id} Entity={Entity}/>)}
                </tbody>
            </table>
        </>
    );
}