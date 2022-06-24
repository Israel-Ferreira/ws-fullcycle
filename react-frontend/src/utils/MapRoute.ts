export class MapRoute {
    public currentMarker : google.maps.Marker
    public endMarker: google.maps.Marker

    constructor(options?: {
        currentMarkerOptions: google.maps.ReadonlyMarkerOptions,
        endMarkerOptions: google.maps.ReadonlyMarkerOptions
    }) {
        this.currentMarker = new google.maps.Marker(options?.currentMarkerOptions)
        this.endMarker = new google.maps.Marker(options?.endMarkerOptions)
    }
    
}


export class Map {

    public map: google.maps.Map
    private routes: {[id: string] : MapRoute} = {}


    constructor(element: Element, options: google.maps.MapOptions){
        this.map =  new google.maps.Map(element, options)
    }


    addRoute(
        id: string,
        routeOptions: {
            currentMarkerOptions: google.maps.ReadonlyMarkerOptions,
            endMarkerOptions: google.maps.ReadonlyMarkerOptions
        }
    ){
        this.routes[id] =  new MapRoute({
            currentMarkerOptions: {
                ...routeOptions.currentMarkerOptions,
                map: this.map
            },
            endMarkerOptions: {
                ...routeOptions.endMarkerOptions,
                map: this.map
            }
        })

        this.fitBounds()

    }



    private fitBounds() {
        const bounds =  new google.maps.LatLngBounds();

        Object.keys(this.routes).forEach((id: string)  => {
            const route =  this.routes[id]
            bounds.extend(route.currentMarker.getPosition() as any)
            bounds.extend(route.endMarker.getPosition() as any)
        })


        this.map.fitBounds(bounds)
    }
}