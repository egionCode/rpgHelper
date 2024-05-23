import { Schema, connect } from 'mongoose'
import { MONGO_URL } from '$env/static/private';


const client = connect(MONGO_URL);


