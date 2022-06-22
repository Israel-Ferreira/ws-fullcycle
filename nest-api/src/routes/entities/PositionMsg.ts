export interface PositionMsg {
    routeId: string
    clientId: string
    position: [number, number]
    finished: boolean
}