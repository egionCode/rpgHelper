import { Schema, model } from "mongoose"

interface Character {
    avatar: string
    name?: string
    type?: string
    ac?: number
    lvl?: number
    hp?: number
    xp?: number
    race?: string
    class?: string
    local?: string
    abilities?: string
    obs?: string
}

const CharacterSchema = new Schema<Character>({
    avatar: { type: String },
    name: { type: String },
    type: { type: String },
    ac: { type: Number },
    lvl: { type: Number },
    hp: { type: Number },
    xp: { type: Number },
    race: { type: String },
    class: { type: String },
    local: { type: String },
    abilities: { type: String },
    obs: { type: String }
})

const characterModel = model<Character>('characters', CharacterSchema);
export default characterModel;