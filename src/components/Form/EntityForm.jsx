import { useState } from "react";
import axios from "axios";

// This component is for the creation of a entity in our database

// This approach works for static data (the options won't ever change)
// If it's dynamic data such as seasonal dropdowns, read the options from an API
const entityTypes = [
    <option>Please select a type</option>,
    <option>Fire</option>,
    <option>Water</option>,
    <option>Grass</option>,
    <option>Flying</option>,
    <option>Ice</option>,
    <option>Electric</option>,
    <option>Rock</option>,
    <option>Ground</option>,
    <option>Normal</option>,
    <option>Poison</option>,
    <option>Steel</option>,
];

export const entityForm = ({setentityList}) => {

    // You may have the state be an object or break it out into separate states
    // Personally, I would advocate using react-hook-form and yup
    const [entityData, setEntityData] = useState({
        entityName: '',
        pokedexNumber: null,
        pokedexDescription: '',
        type1: null,
        type2: null,
        isLegendary: false,
        imageUrl: null
    });

    const handleClear = () => {
        setentityData({
            entityName: '',
            pokedexNumber: null,
            pokedexDescription: '',
            type1: null,
            type2: null,
            isLegendary: false,
            imageUrl: null
        });
    }

    /**
     * Page refresh is the default behavior for a form submit,
     * since we're an SPA (Single Page Application), we do NOT want the page to refresh
     * 
     * The DOM calls our function handler with the first parameter being the event object itself
     * The event object will reference where it came from
     */
    const handleSubmit = async (event) => {
        // event.preventDefault() will prevent the page refresh
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:9000/entity', {
                name: entityData.entityName,
                pokedex: {
                    number: entityData.pokedexNumber,
                    description: entityData.pokedexDescription
                },
                // Write some validation logic to ensure empty values don't get added to the array
                // The validation on the backend already exists, so no problems there
                types: [entityData.type1, entityData.type2],
                isLegendary: entityData.isLegendary,
                imageUrl: entityData.imageUrl
            });
            console.log('NEW entity!!')
            console.log(res.data);

            // use the setentityList to manually add the entity to it
            // 1. Do this approach of manually adding "optimistic update"
            // 2. Refetch the data
            setentityList(entityList => [...entityList, res.data]);

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
                <label htmlFor="entity-name">entity Name: </label>
                <input 
                    id="entity-name"
                    value={entityData.entityName}
                    // Spread the contents of the old object into a new one, then update the name to be
                    // the input's value using the event object
                    onChange={e => setentityData({...entityData, entityName: e.target.value})} 
                    placeholder="ex. Charmander" 
                />
                </div>
            </div>
            <div>
                <div>
                <label htmlFor="pokedex-number">Pokedex Number: </label>
                <input 
                    id="pokedex-number"
                    type="number"
                    value={entityData.pokedexNumber}
                    onChange={e => setentityData({...entityData, pokedexNumber: e.target.value})}
                    placeholder="Pokedex Number"
                />
                </div>
                <div>
                <label htmlFor="pokedex-description">Description: </label>
                <input 
                    id="pokedex-description"
                    value={entityData.pokedexDescription}
                    onChange={e => setentityData({...entityData, pokedexDescription: e.target.value})}
                    placeholder="Pokedex Description"
                />
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="type-1">Type 1: </label>
                    <select id="type-1" onChange={e => setentityData({...entityData, type1: e.target.value})}>
                        {entityTypes}
                    </select>
                </div>
                <div>
                    <label htmlFor="type-2">Type 2: </label>
                    <select id="type-2" onChange={e => setentityData({...entityData, type2: e.target.value})}>
                        {entityTypes}
                    </select>
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="is-legendary">Is it a Legendary? </label>
                    <input id="is-legendary" type="checkbox" onChange={() => setentityData({...entityData, isLegendary: !entityData.isLegendary})} />
                </div>
                <div>
                    <label htmlFor="image-url">Image URL: </label>
                    <input id="image-url" value={entityData.imageUrl} onChange={e => setentityData({...entityData, imageUrl: e.target.value})}/>
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