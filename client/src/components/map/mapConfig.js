import mapStyles from "./mapStyles";

export const libraries = ["places"];
export const mapContainerStyle = {
  width: "60vw",
  height: "100vh",
  float: "right",
};
export const center = {
  lat: 40.712776,
  lng: -74.005974,
};
export const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
