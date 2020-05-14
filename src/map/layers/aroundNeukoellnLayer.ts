import L from "leaflet";
import aroundNeukoellnShape from "@/assets/data/aroundNeukoelln.json";

export const aroundNeukoellnLayer = () => {
  // @ts-ignore
  return L.geoJSON(aroundNeukoellnShape, {
    style() {
      return {
        fillColor: "black",
        fillOpacity: 0.8,
        color: "black",
        opacity: 0.9,
        weight: 5
      };
    }
  });
};
