import L from 'leaflet';

const routeStyle = {
  color: '#F9971E',
  weight: 5,
};

const startEndPointsStyle = {
  color: '#F9971E',
  radius: 10,
  fillOpacity: 1,
};

const geojsonMarkerOptions = {
  radius: 12,
  fillColor: '#ff7800',
  color: '#000',
  weight: 1,
  opacity: 1,
  fillOpacity: 1,
};

export default class Map extends L.Map {
  constructor(id: any, params: any) {
    super(id, params);
    // Custom Map Setup
    const tonerUrl = 'http://tile.stamen.com/terrain/{Z}/{X}/{Y}.png';
    const url = tonerUrl.replace(/({[A-Z]})/g, s => s.toLowerCase());
    const basemap = L.tileLayer(url, {
      subdomains: ['', 'a.', 'b.', 'c.', 'd.'],
      minZoom: 0,
      maxZoom: 17,
      attribution: 'Map tiles by <a href="//stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>',
    });
    basemap.addTo(this);
    this.setView([51.505, -0.09], 13);
  }

  drawPoints(featureCollection: any) {
    L.geoJSON(featureCollection, {
      pointToLayer: (feature, latlng) => L.circleMarker(latlng, geojsonMarkerOptions),
    }).addTo(this);
  }

  drawStartEndPoints(startEndPoints: any) {
    startEndPoints.forEach((coords: any) => {
      const circle = L.circle(coords.reverse(), startEndPointsStyle);
      circle.addTo(this);
    });
  }

  fitZoom(startEndPoints: any) {
    this.fitBounds(startEndPoints);
  }

  // fitZoomFarthestTwoPoints(featureCollection: any) {
  //   const coords = featureCollection.features.map((feat: any) => feat.geometry.coordinates);
  //   const farthestPoints = farthestTwoPoints(coords);
  //   this.fitZoom(farthestPoints);
  // }
}