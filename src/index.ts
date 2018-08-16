import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';


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


/**
 * Create Popup
 */
function addPopup(evt: ol.MapBrowserEvent, map: ol.Map, options?: { innerHTML: string }) {
    let content = document.createElement('div');
    content.className = 'ol-popup-content';
    if (options && options.innerHTML) {
        content.innerHTML = options.innerHTML;
    }

    let closer = document.createElement('a');
    closer.className = 'ol-popup-closer';

    let container = document.createElement('div');
    container.className = 'ol-popup';
    container.id = `popup_${new Date().getTime()}`;

    container.appendChild(closer);
    container.appendChild(content);

    let overlayoptions = {
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    };

    var overlay = new Overlay(<any>overlayoptions);
    overlay.setPosition(evt.coordinate);
    let closeFunction = () => {
        closer.removeEventListener('click', closeFunction, false)
        map.removeOverlay(overlay);
    }
    closer.addEventListener('click', closeFunction, false);

    map.addOverlay(overlay);
}

/**
 *  Add a click handler to the map to render the popup.
*/
function mapOnClick(evt: any) {
    addPopup(evt, map, {
        innerHTML: '<p>You clicked here:</p><code>' + evt.coordinate + '</code>'
    });
}
map.on('singleclick', mapOnClick);