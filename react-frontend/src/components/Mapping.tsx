import React, { FormEvent, useCallback, useEffect, useState } from 'react';

import {Button, Grid, MenuItem, Select} from '@mui/material'
import { Route } from '../utils/route';


const API_URL = process.env.REACT_APP_API_URL


function Mapping() {
    const [routes, setRoutes] = useState<Route[]>([])
    const [routeIdSelected, setRouteIdSelected] =  useState<string>('')

    useEffect(() => {
        fetch(`${API_URL}/routes`)
            .then(data => data.json())
            .then(data => setRoutes(data))
    }, [])


    const startRoute = useCallback((event: FormEvent) => {
        event.preventDefault()
        console.log(routeIdSelected)
    },[routeIdSelected])

    
    return (
        <Grid container>
            <Grid item xs={12} sm={3}>
                <form onSubmit={startRoute}>
                    <Select fullWidth value={routeIdSelected} onChange={(e) => setRouteIdSelected(e.target.value)}>
                        <MenuItem value={""}>
                            <em>Selecione uma corrida</em>
                        </MenuItem>
                        {routes.map((rt, key) => (
                            <MenuItem key={key} value={rt._id}>{rt.title}</MenuItem>
                        ) )}
                    </Select>

                    <Button type='submit' variant='contained' color='primary'>Iniciar uma corrida</Button>
                </form>
            </Grid>
            <Grid item xs={12} sm={9}>
                <div id="map"></div>
            </Grid>
        </Grid>
    );
}

export default Mapping;