import { useState, useEffect } from 'react'
import { useMountedRef } from '../../hooks/useMountedRef'
import "./Battle.css"


const Battle = () => {
	const [Hamster1, setHamster1] = useState(null)
	const [Hamster2, setHamster2] = useState(null)
	const [EnableResults, SetEnableResults] = useState(false)
	const [winner, setWinner] = useState(null)

	const isMounted = useMountedRef()
	const defaultString = "Loading Hamsters"

	useEffect(() => {
		async function get() {
			const Hamster1Random = await getRandomHamster()
			const Hamster2Random = await getRandomHamster()

			if (isMounted.current) {
				setHamster1(Hamster1Random)
				setHamster2(Hamster2Random)
			}
		}
		get() 
	},	[isMounted])


	async function SendResults(winner) {
		console.log(EnableResults);

		if (!EnableResults) {
			setWinner(winner)
			if(winner === Hamster1) {

                let Hamster1Wins = (Hamster1.wins + 1)
                let Hamster1Games = (Hamster1.games + 1)
                const Hamster1PackageData = {
                    "id": Hamster1.id,
                    "name": Hamster1.name,         
                    "age": Hamster1.age,         
                    "favFood": Hamster1.favFood,         
                    "loves": Hamster1.loves,          
                    "imgName": Hamster1.imgName,          
                    "wins": Hamster1Wins,           
                    "defeats": Hamster1.defeats,           
                    "games": Hamster1Games
                }
                let Hamster2Defeats = (Hamster2.defeats + 1)
                let Hamster2Games = (Hamster2.games + 1)
                const Hamster2PackageData = {
                    "id": Hamster2.id,
                    "name": Hamster2.name,         
                    "age": Hamster2.age,         
                    "favFood": Hamster2.favFood,         
                    "loves": Hamster2.loves,          
                    "imgName": Hamster2.imgName,          
                    "wins": Hamster2.wins,           
                    "defeats": Hamster2Defeats,           
                    "games": Hamster2Games
                }
                console.log("hamaster2.id loggen " + Hamster2.id + " och hamster 1 " + Hamster1.id);

                await fetch("/hamsters/" + Hamster1.id, { 
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Hamster1PackageData) 
                })
                await fetch("/hamsters/" + Hamster2.id, { 
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Hamster2PackageData) 
                })

			} else {

				let Hamster2Wins = (Hamster2.wins + 1)
                let Hamster2Games = (Hamster2.games + 1)
                const Hamster2PackageData = {
                    "id": Hamster2.id,
                    "name": Hamster2.name,         
                    "age": Hamster2.age,         
                    "favFood": Hamster2.favFood,         
                    "loves": Hamster2.loves,          
                    "imgName": Hamster2.imgName,          
                    "wins": Hamster2Wins,           
                    "defeats": Hamster2.defeats,           
                    "games": Hamster2Games
                }
                let Hamster1Defeats = (Hamster1.defeats + 1)
                let Hamster1Games = (Hamster1.games + 1)
                const Hamster1PackageData = {
                    "id": Hamster1.id,
                    "name": Hamster1.name,         
                    "age": Hamster1.age,         
                    "favFood": Hamster1.favFood,         
                    "loves": Hamster1.loves,          
                    "imgName": Hamster1.imgName,          
                    "wins": Hamster1.wins,           
                    "defeats": Hamster1Defeats,           
                    "games": Hamster1Games
                }
                console.log("hamaster2.id loggen " + Hamster2.id + " och hamster 1 " + Hamster1.id);
                await fetch("/hamsters/" + Hamster1.id, { 
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Hamster1PackageData) 
                })
                await fetch("/hamsters/" + Hamster2.id, { 
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Hamster2PackageData) 
                })


			}

			SetEnableResults(true)
		}
	}

    function refreshPage(){
        window.location.reload();
    }

	async function getRandomHamster() {
		const response = await fetch("/hamsters/random", { method: 'GET' })
		const hamster = await response.json()
		return hamster
	}

	return (
		<section className="BattleWrapper">
			<div className="battle">
				{Hamster1 ? 
					<div onClick={() => SendResults(Hamster1)}>
						<div className="BattleBox">
                            <p>Namn: {Hamster1.name}</p>
					        <p>Ålder: {Hamster1.age}</p>
					        <p>Favoritaktivitet: {Hamster1.loves}</p>
					        <p>Favoritmat: {Hamster1.favFood}</p>
                            <div className="HamsterInfoBackgroundImage" style={{backgroundImage: "url(img/" + Hamster1.imgName + ")"}}></div>
						</div>
					</div>
				: defaultString
				}
				{Hamster2 ? 
					<div onClick={() => SendResults(Hamster2)}>
						<div className="BattleBox">
							<p>Namn: {Hamster2.name}</p>
					        <p>Ålder: {Hamster2.age}</p>
					        <p>Favoritaktivitet: {Hamster2.loves}</p>
					        <p>Favoritmat: {Hamster2.favFood}</p>
                            <div className="HamsterInfoBackgroundImage" style={{backgroundImage: "url(img/" + Hamster2.imgName + ")"}}></div>	
						</div>
					</div>
				: defaultString
				}
			</div>

		{EnableResults ? 
			
				<div>
                    <p>{winner.name} Är vinnaren</p>
					<div>
						<div>
							<p>Namn: {Hamster1.name}</p>
							<p>Segrar: {Hamster1.wins}</p>
							<p>Förluster: {Hamster1.defeats}</p>
						</div>
						<div>
							<p>Namn: {Hamster2.name}</p>
							<p>Segrar: {Hamster2.wins}</p>
							<p>Förluster: {Hamster2.defeats}</p>
						</div>
					</div>
					<button onClick={() => refreshPage()}>Another go?</button>
				</div>
			: ''}
		
		</section>

	)
}
export default Battle