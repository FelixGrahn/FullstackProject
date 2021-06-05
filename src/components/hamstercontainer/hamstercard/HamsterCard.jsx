import "./HamsterCard.css"

function HamsterCard(Datapackage) {
  return (
    <div key={Datapackage.hamster.id}>

      <p>{Datapackage.hamster.name}</p>

    </div>
  );
}

export default HamsterCard;