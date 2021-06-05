import { useState } from "react"
import "./HamsterForm.css"

const HamsterForm = () => {
    const [InputName, SetInputName] = useState("")
    const [InputAge, SetInputAge] = useState("")
    const [InputFavFood, SetInputFavFood] = useState("")
    const [InputLoves, SetInputLoves] = useState("")
    const [InputImgName, SetInputImgName] = useState("")
    const [Wins] = useState(0)
    const [Defeats] = useState(0)
    const [Games, SetGames] = useState(0)


    async function SendData() {
        SetGames(Wins + Defeats)

        if (InputName.length < 1 || InputFavFood.length < 1 || InputLoves.length < 1) {
            console.log("Name, FavFood or Loves has a lower case count then one");
            return;
        }

        const PackageData = {
            "name": InputName,
            "age": InputAge,
            "favFood": InputFavFood,
            "loves": InputLoves,
            "imgName": InputImgName,
            "wins": Wins,
            "defeats": Defeats,
            "games": Games
        }

        console.log("packageData: " + PackageData);

        await fetch("/hamsters", { 
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(PackageData) 
		})


    }

    return(
        <div className="HamsterFormWrapper">
            <label>
                <p>Name: </p>
                <input onChange={event => { SetInputName(event.target.value) }} value={InputName} />
            </label>
            <label>
                <p>Age: </p>
                <input onChange={event => { SetInputAge(event.target.value) }} value={InputAge} />
            </label>
            <label>
                <p>favorite Food: </p>
                <input onChange={event => { SetInputFavFood(event.target.value) }} value={InputFavFood} />
            </label>
            <label>
                <p>Loves: </p>
                <input onChange={event => { SetInputLoves(event.target.value) }} value={InputLoves} />
            </label>
            <label>
                <p>Image Name: </p>
                <input onChange={event => { SetInputImgName(event.target.value) }} value={InputImgName} />
            </label>
            <button onClick={SendData}>SendHamsterPackage</button>
        </div>
    )
}

export default HamsterForm