import { Schema, connect } from 'mongoose'
import characterModel from './model/character';


const client = connect('mongodb://db/rpg_helper')

export async function list(collection_name: string, filter: any = {}) {
    return await characterModel.find().exec();
}
export async function store(collection_name: string, data: any) {
    return await characterModel.create(data)
}
export async function update(collection_name: string, data: any) {
    return await characterModel.findOneAndUpdate({ _id: data._id }, data)
}