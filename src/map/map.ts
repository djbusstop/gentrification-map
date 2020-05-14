import L from "leaflet";

export default class Map extends L.Map {
  // Initialises map with stamen tile layer
  constructor(id: any, params: any) {
    super(id, params);
    // Custom Map Setup
    const tonerUrl = "http://tile.stamen.com/terrain/{Z}/{X}/{Y}.png";
    const url = tonerUrl.replace(/({[A-Z]})/g, (s) => s.toLowerCase());
    const basemap = L.tileLayer(url, {
      subdomains: ["", "a.", "b.", "c.", "d."],
      minZoom: 0,
      maxZoom: 17,
      attribution:
        'Map tiles by <a href="//stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
    });
    basemap.addTo(this);
    this.setView([51.505, -0.09], 13);
  }
}
