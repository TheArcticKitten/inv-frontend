import { useState } from "react";
import axios from "axios";

// This component is for the creation of a entity in our database

// This approach works for static data (the options won't ever change)
// If it's dynamic data such as seasonal dropdowns, read the options from an API
const entityTypes = [
    <option>Please select a type</option>,
    <option>Consoles and Hardware</option>,
    <option>Video Game</option>,
    <option>Accessory</option>,
    <option>PC</option>,
    <option>Electronics</option>,
    <option>Toys</option>,
    <option>Clothing</option>,
];

export const EntityForm = ({setEntityList}) => {

    // You may have the state be an object or break it out into separate states
    // Personally, I would advocate using react-hook-form and yup
    const [entityData, setEntityData] = useState({
        entityCount: null,
        entityDesc: '',
        entityId: '',
        entityName: '',
        entitySize: null,
        imageUrl: null,
        warehouseId: null,
        __v: null,
        _id: null,
    });

    const handleClear = () => {
        setEntityData({
            entityCount: null,
            entityDesc: '',
            entityId: '',
            entityName: '',
            entitySize: null,
            imageUrl: null,
            warehouseId: null,
            __v: null,
            _id: null,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/entity', { 
                entityCount: null,    
                entityDesc: '',
                entityId: '',
                entityName: entityData.entityName,
                entitySize: null,
                imageUrl: null,
                warehouseId: null,
                __v: null,
                _id: null,
            });
            console.log('NEW entity!!')
            console.log(res.data);

            setEntityList(entityList => [...entityList, res.data]);

            event.target.reset();
            handleClear();
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        <form onSubmit={handleSubmit} className="entity-form">
            <div>
                <div>
                <label htmlFor="entity-name">Entity Name: </label>
                <input 
                    id="entity-name"
                    value={entityData.entityName}
                    // Spread the contents of the old object into a new one, then update the name to be
                    // the input's value using the event object
                    onChange={e => setEntityData({...entityData, entityName: e.target.value})} 
                    placeholder="ex. Nintendo Switch" 
                />
                </div>
            </div>
            <div>
                <div>
                <label htmlFor="entity-id">Entity ID Number: </label>
                <input 
                    id="entity-id"
                    type="number"
                    value={entityData.entityId}
                    onChange={e => setEntityData({...entityData, entityId: e.target.value})}
                    placeholder="Entity ID Number"
                />
                </div>
                <div>
                <label htmlFor="entity-desc">Description: </label>
                <input 
                    id="entity-description"
                    value={entityData.entityDesc}
                    onChange={e => setEntityData({...entityData, entityDesc: e.target.value})}
                    placeholder="Entity Description"
                />
                </div>
                <div>
                <label htmlFor="entity-size">Entity Size: </label>
                <input 
                    id="entity-size"
                    value={entityData.entitySize}
                    onChange={e => setEntityData({...entityData, entitySize: e.target.value})}
                    placeholder="Entity Size (per unit)"
                />
                </div>
                <div>
                <label htmlFor="entity-size">Unit Count: </label>
                <input 
                    id="entity-count"
                    value={entityData.entityCount}
                    onChange={e => setEntityData({...entityData, entityCount: e.target.value})}
                    placeholder="Unit Count"
                />
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="image-url">Image URL: </label>
                    <input id="image-url" value={entityData.imageUrl} onChange={e => setEntityData({...entityData, imageUrl: e.target.value})}/>
                </div>
            </div>
            {/* A button's default behavior if inside a form is to submit it */}
            {/* This means that clicking the button will submit the form and refresh the page */}
            <div>
                <button type="reset" onClick={handleClear}>Clear</button>
                <button>Submit</button>
            </div>
            
        </form>
    );
}