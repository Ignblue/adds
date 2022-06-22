import React from "react"
import addService from '../servises/adds'

const Adds = ({ adds, setAdds, setConfirmMessage, searchName }) =>
{
    //
    //handleDelete
    //
    const handleDelete = (event) =>
    {
        event.preventDefault()

        const id = parseInt(event.target.value)

        const add = adds.find((ele) => ele.id === id)

        //delete

        if (window.confirm(`Delete ${add.item}?`))
        {


            addService.remove(id)
                .then(() => addService.getAll())
                .then((res) =>
                {
                    setAdds(res)
                    setConfirmMessage(`deleted ${add.item}.`)
                })
        }
    }

    //
    // handleDelete2 (a beter way to handle promises (async/await))
    //

    const handleDelete2 = async (event) =>
    {
        event.preventDefault()

        const id = event.target.value
      //const id = parseInt(event.target.value) buvo
        const add = adds.find((ele) => ele.id === id)
        
        //delete

        if (window.confirm(`Pašalinti ${add.item}?`))
        {
            try
            {
                await addService.remove(id)
                const result = await addService.getAll();
                setAdds(result)
                setConfirmMessage(`Pašalintas ${add.item}.`)
                setTimeout(() => {
          setConfirmMessage(null)
        }, 5000)
            }
            catch (err)
            {
                console.log("Persons.handleDelete", err)
            }
        }
    }

    const addToShow = adds.filter(ele => ele.item.includes(searchName))

    return (
        <div>
            {
                addToShow.map((ele, i) => 
                {
                    return (
                        <div key={i}>
                            <p>Žymuo: {ele.item} </p>
                            <p> Aprašymas: {ele.description} </p>
                            <p>Kaina: {ele.price} $ </p>
                            <p>Nuotrauka: <img src={ele.photo} height="50px"/></p>
                            <button value={ele.id} onClick={handleDelete2}>pašalinti skelbimą</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Adds

