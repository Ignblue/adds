import React from "react"
const AddForm=({addName, newName,handleNameChange, newDescription,handleDescriptionChange, newPrice, handlePriceChange, newPhoto, handlePhotoChange})=>{
    return (
        <div>
            <form onSubmit={addName} >
                <div className='gaps'>
                    Žymuo: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div className='gaps'>
                    Aprašymas: <input value={newDescription} onChange={handleDescriptionChange}/>
                </div>
                <div className='gaps'>
                    Kaina: <input value={newPrice} onChange={handlePriceChange}/>
                </div>
                <div className='gaps'>
                    Nuotrauka:<img src={newPhoto} height="100px"/> <input type="file" onChange={handlePhotoChange}/>
                </div>
                <div>
                    <button type="submit">Įkelti skelbimą</button>
                </div>
            </form>
        </div>
    )
    }
    export default AddForm