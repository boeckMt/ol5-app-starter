import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';


var layers = [
    new TileLayer({
        source: new OSM()
    })
];

const map = new Map({
    target: 'map',
    layers: layers,
    view: new View({
        projection: 'EPSG:4326',
        center: [0, 0],
        zoom: 0
    })
});