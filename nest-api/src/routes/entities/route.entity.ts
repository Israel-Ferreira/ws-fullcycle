import {Prop, raw, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose';
import { Position } from './position';


export type RouteDocument = Route & Document

@Schema()
export class Route {

    @Prop()
    _id: string;

    @Prop()
    title: string;

    @Prop(
        raw({
            lat: {type: Number},
            lng: {type: Number}
        })
    )
    startPosition: Position

    @Prop(
        raw({
            lat: {type: Number},
            lng: {type: Number}
        })
    )
    endPosition: Position
}


export const RouteSchema = SchemaFactory.createForClass(Route)