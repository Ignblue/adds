import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AddForm from './components/AddForm'
import Adds from './components/Adds'
import addService from './servises/adds'
import Notification from './components/Notification'

const App = () =>
{
  const [adds, setAdds] = useState([])
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newPhoto, setNewPhoto] = useState('')
  const [searchName, setSearchName] = useState('')
  const [confirmMessage, setConfirmMessage] = useState(null)

  useEffect(() =>
  {
    addService.getAll()
      .then(res =>
      {
        setAdds(res)
      })
  }, [])

  const hadleSearchChange = (event) =>
  {
    setSearchName(event.target.value)
  }

  const addName = (event) =>
  {
    event.preventDefault()

    const duplicate = adds.find(add => add.item === newName)

    if (duplicate === undefined)
    {
      //create new

      const nameObject = {
        item: newName,
        description: newDescription,
        price: newPrice,
        photo: newPhoto
      }

      addService.create(nameObject)
        .then(() => addService.getAll())
        .then((res) =>
        {
          setAdds(res)
          setConfirmMessage(`Added ${nameObject.name}.`)
          setTimeout(() => {
          setConfirmMessage(null)
        }, 5000)
        })
        .catch(error =>
        {
          setConfirmMessage(`Person validation failed: name ${nameObject.item} is shorter then minimum allowed length(3) or number ${nameObject.description} is shorter then minimum allowed length(8).`)
          console.log('fail', error)
          setTimeout(() => {
            setConfirmMessage(null)
          }, 10000);
          
        })
    }
    else
    {
      //update number

      if (window.confirm(`Atnaujinti ${newName}?`))
      {
        const nameObject = {
          item: duplicate.item,
          description: newDescription,
          price: newPrice,
          photo: newPhoto
        }

        addService.update(duplicate.id, nameObject)
          .then(() => addService.getAll())
          .then((res) =>
          {
            setAdds(res)
            setConfirmMessage(`Atnaujintas ${nameObject.item}.`)
            setTimeout(() => {
          setConfirmMessage(null)
        }, 5000)
          })
          .catch(error =>
          {
            console.log('fail', error)
          })
      }
    }
    setNewName('')
    setNewDescription('')
    setNewPrice('')
    setNewPhoto('')
  }

  const handleNameChange = (event) =>
  {
    setNewName(event.target.value)
  }

  const handleDescriptionChange = (event) =>
  {
    setNewDescription(event.target.value)
  }

  const handlePriceChange = (event) =>
  {
    setNewPrice(event.target.value)
  }
   const handlePhotoChange = async (event) =>
  {
    const file=event.target.files[0]
    const base64=await convetToBase64(file)
    setNewPhoto(base64);
  };

  const convetToBase64=(file)=>{

    return new Promise((resolve,reject)=>{
    
      const fileReader= new FileReader();
fileReader.readAsDataURL(file);
fileReader.onload=(()=>{
  resolve(fileReader.result);

  fileReader.onerror=((error)=>{
    reject(error)
  })

});
  });
  };
  return (
    <div>
      <h2>Skelbimai</h2>
      
      <Notification message={confirmMessage} />
      <Filter title='Paieska'
        name={searchName} handleFunction={hadleSearchChange}
      />
      
      <h2>Pridėti naują skelbimą</h2>
     
      <AddForm addName={addName} newName={newName}
        handleNameChange={handleNameChange} newDescription={newDescription} handleDescriptionChange={handleDescriptionChange}
        newPhoto={newPhoto} handlePhotoChange={handlePhotoChange} newPrice={newPrice} handlePriceChange={handlePriceChange} />
      
      <h2>Visi skelbimai</h2>
      
      <Adds
        adds={adds}
        setAdds={setAdds}
        setConfirmMessage={setConfirmMessage}
        searchName={searchName} 
        />
        
    </div>
  )
}

export default App