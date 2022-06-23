import { google } from "google-maps"

export class MapRoute {
    public currentMarker : google.maps.Marker
    public endMarker: google.maps.Marker

    constructor(currentMarker: google.maps.Marker, endMarker: google.maps.Marker) {
        this.currentMarker = currentMarker;
        this.endMarker =  endMarker;
    }
    
}