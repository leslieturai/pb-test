
import { useEffect, useState } from 'react';
import './App.css';
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps"


function App() {

    const position = {lat: 49.285579, lng: -123.112148};

    const [positions, setPositions] = useState([])

    useEffect(() => {
/*      const interval = setInterval(() => {
            fetch("/map-update/").then((res) => {
            res.json().then((data) => {
            //console.log(data)
            console.log("Updating!")
            setPositions(data)
          })
          })
      }, 1200000)
      return () => {clearInterval(interval)} */
    }, [])

  return (
    <div className="App">

    {/* <img id="test" src='https://britishcolumbia.com/images/maps/vancouver-downtown.gif' style={{top: "20%"}}></img> */}
      
      
    <APIProvider apiKey={'AIzaSyDy-6rkV4XH2UXvyubcwT3PLH9H-Hef0vI'} onLoad={() => {console.log("Loaded!")}}>
      <Map
          defaultZoom={12}
          defaultCenter={position}
          mapId="8e0468e996c5bdf3b9dbf482"
          //onZoomChanged={(e) => {console.log(e.detail.zoom)}}  
          
        >
          <AdvancedMarker  position={{lat: 49.281895, lng: -123.124973}}
            anchorTop='-50%'
          >
            <img src={require('./Images/Bus-1-3.png')}></img>
          </AdvancedMarker>
          
          {positions !== null && positions !== undefined ? <>
            {positions.map((e, i) => {
              return <AdvancedMarker key={i} position={{lat: e.latitude, lng: e.longitude}}></AdvancedMarker>
            })}
          </>  : <></>}
      </Map>
    </APIProvider>
    </div>
  );
}

export default App;
