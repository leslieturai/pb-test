const express = require('express');
const GtfsRealtimeBindings = require("gtfs-realtime-bindings")

let url = `https://gtfsapi.translink.ca/v3/gtfsposition?apikey=d3Jb41aW5McmcEw0xKjX`

/* import GtfsRealtimeBindings from "gtfs-realtime-bindings"; */



const app = express()
const port = 5000




app.get('/map-update', (req, res) => {
  (async () => {
  try {
const response = await fetch(url);
    if (!response.ok) {
      const error = new Error(`${response.url}: ${response.status} ${response.statusText}`);
      error.response = response;
      throw error;
    }
    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(buffer)
    );

    let tempData = []
    feed.entity.forEach((entity, i) => {
      if (i < 5) {
       tempData.push(entity.vehicle.position)
      }
    })

    res.send(tempData)
  }
  catch (error) {
  console.log(error);
    process.exit(1); 
  }
})()

  //res.json({"status": "here"})

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})







