import "./Gallery.css"
import { useEffect, useState } from 'react'
import { useMountedRef } from "../../hooks/useMountedRef"
import HamsterCard from "../hamstercontainer/hamstercard/HamsterCard"
import HamsterForm from "../hamstercontainer/hamsterform/HamsterForm"
import HamsterInfo from "../hamstercontainer/hamsterinfo/HamsterInfo"

const Gallery = () => {
  const [Hamsters, SetHamsters] = useState(null)
  const [SelectedHamster, SetSelectedHamster] = useState(null)
  const isMounted = useMountedRef()

  useEffect(() => {
    async function get() {
        if (isMounted.current) {
            SetHamsters(await FetchHamsters())
        }
      }
      get()
    }, [isMounted])


    async function FetchHamsters() {
      console.log("Do Heroku Reach here? line 24 in gallery");
        const response = await fetch("/hamsters", { method: 'GET'})
        console.log("Do Heroku Reach here? line 26 in gallery");
        console.log("basic fetch " + response + " och fetch.json ");
        return await response.json()
      }
    
      async function DeleteHamster(hamsterId) {
        await fetch("/hamsters/" + hamsterId, { method: 'DELETE'})
        SetHamsters(await SetHamsters())
      }
    
      function EnableHamsterInfo(hamster) {
        SetSelectedHamster(hamster)
      }
    
      function DisableHamsterInfo() {
        SetSelectedHamster(null)
      }

      return (
          <div>
              {SelectedHamster ? <div> <div className="DarkBackground " onClick={() => DisableHamsterInfo()}></div> <HamsterInfo hamster={SelectedHamster}/></div>: ""}

      <div className="Gallery">
          {Hamsters ? Hamsters.map(hamster => (<div key={hamster.id} className="GalleryItem" onClick={() => EnableHamsterInfo(hamster)}><HamsterCard hamster={hamster} />
                  <button onClick={(e) => {e.stopPropagation(); DeleteHamster(hamster.id)} }>Remove</button>
                </div>

            ))
            : "Hämtar hamsters fråm API..."
          }
        </div>
        <div>
        <HamsterForm />
        </div>
          </div>
      )
}

export default Gallery