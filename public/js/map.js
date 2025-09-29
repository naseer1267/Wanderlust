let key = keyToken;
const styleJson = `https://api.maptiler.com/maps/streets-v2/style.json?key=${key}`;

// import { Map, MapStyle, config } from "@maptiler/sdk";
// import "@maptiler/sdk/dist/maptiler-sdk.css";

// config.apiKey = "JTBCQ79CyklCNPXZEO1G";
// const map = new Map({
//   container: "map", // container's id or the HTML element in which SDK will render the map
//   style: MapStyle.STREETS,
//   center: [16.62662018, 49.2125578], // starting position [lng, lat]
//   zoom: 14, // starting zoom
// });
const attribution = new ol.control.Attribution({
  collapsible: false,
});

const map = new ol.Map({
  target: "map",
  controls: ol.control.defaults
    .defaults({ attribution: false })
    .extend([attribution]),
  view: new ol.View({
    constrainResolution: true,
    center: ol.proj.fromLonLat(coordinates),
    zoom: 10,
  }),
});
olms.apply(map, styleJson);

console.log(coordinates);
// Set options
// const marker = new maptilersdk.Marker({
//   color: "red",
//   draggable: true,
// })
//   .setLngLat(coordinates)
//   .addTo(map);

// Create a marker feature
// const marker = new ol.Feature({
//   geometry: new ol.geom.Point(ol.proj.fromLonLat(coordinates)),
// });

// // Create a vector source and add marker
// const markerSource = new ol.source.Vector({
//   features: [marker],
// });

// // Create a layer for the marker
// const markerLayer = new ol.layer.Vector({
//   source: markerSource,
// });

// // Add marker layer to map
// map.addLayer(markerLayer);
