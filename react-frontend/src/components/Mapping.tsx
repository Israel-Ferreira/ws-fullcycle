import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react';

import { Button, Grid, MenuItem, Select } from '@mui/material'
import { Route } from '../utils/route';
import { Loader } from 'google-maps';
import { getCurrentPosition } from '../utils/geolocation';
import { makeCarIcon, makeMarkerIcon } from '../utils/map';
import { sample, shuffle } from 'lodash';


const API_URL = process.env.REACT_APP_API_URL


const colors = [
    "#b71c1c",
    "#4a148c",
    "#2e7d32",
    "#e65100",
    "#2962ff",
    "#c2185b",
    "#FFCD00",
    "#3e2723",
    "#03a9f4",
    "#827717",
];



function Mapping() {
    const [routes, setRoutes] = useState<Route[]>([])
    const [routeIdSelected, setRouteIdSelected] = useState<string>('')

    const googleMapsLoader = new Loader(process.env.REACT_APP_GOOGLE_API_KEY)

    const mapRef = useRef<google.maps.Map>();

    useEffect(() => {
        fetch(`${API_URL}/routes`)
            .then(data => data.json())
            .then(data => setRoutes(data))
    }, [])


    useEffect(() => {
        (async () => {
            const [, position] = await Promise.all([
                googleMapsLoader.load(),
                getCurrentPosition({ enableHighAccuracy: true })
            ])

            const divMap = document.getElementById("map") as HTMLElement
            mapRef.current = new google.maps.Map(divMap, {
                zoom: 15,
                center: position
            })

        })()
    }, [])


    const startRoute = useCallback((event: FormEvent) => {
        event.preventDefault()
        console.log(routeIdSelected)

        const color = sample(shuffle(colors)) as string
        

        const route = routes.find(route => route._id === routeIdSelected)
        new google.maps.Marker({
            position: route?.startPosition,
            map: mapRef.current,
            icon: makeCarIcon(color)
        })


        new google.maps.Marker({
            position: route?.endPosition,
            map: mapRef.current,
            icon: makeMarkerIcon(color)
        })


    }, [routeIdSelected, routes])


    return (
        <Grid container style={{
            width: '100%',
            height: '100%'
        }}>
            <Grid item xs={12} sm={3}>
                <form onSubmit={startRoute}>
                    <Select fullWidth value={routeIdSelected} displayEmpty onChange={(e) => setRouteIdSelected(e.target.value)}>
                        <MenuItem value="" selected>
                            <em>Selecione uma corrida</em>
                        </MenuItem>
                        {routes.map((rt, key) => (
                            <MenuItem key={key} value={rt._id}>{rt.title}</MenuItem>
                        ))}
                    </Select>

                    <Button type='submit' variant='contained' color='primary'>Iniciar uma corrida</Button>
                </form>
            </Grid>
            <Grid item xs={12} sm={9}>
                <div id="map" style={{
                    width: '100%',
                    height: '100%'
                }}></div>
            </Grid>
        </Grid>
    );
}

export default Mapping;