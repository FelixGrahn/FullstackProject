import "./HamsterInfo.css"

function HamsterInfo(Datapackage) {
    console.log("Datapackage info (in in HamsterInfo) " + Datapackage);

    return (
        <div className="HamsterInfoBox">
        <div>
     				<p>Namn: {Datapackage.hamster.name}</p>
					<p>Ålder: {Datapackage.hamster.age}</p>
					<p>Älskar: {Datapackage.hamster.loves}</p>
					<p>Favoritmat: {Datapackage.hamster.favFood}</p>
{/*                     <p>HamsterID: {Datapackage.hamster.id}</p>
                    <p>imgName: {Datapackage.hamster.imgName}</p> */}
        </div>
        <div className="HamsterInfoBackgroundImage" style={{backgroundImage: "url(img/" + Datapackage.hamster.imgName + ")"}}></div>
        </div>
    )
}

export default HamsterInfo;