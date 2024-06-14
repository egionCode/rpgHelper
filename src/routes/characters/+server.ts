import { json } from "@sveltejs/kit";
import characterModel from "$lib/db/model/character";

export async function GET({ url }) {
    let filters = url.searchParams.get('filters');
    console.log(JSON.parse(filters))
    if(filters)
        return json(
            await characterModel.find(JSON.parse(filters)).exec()
        )
    return json(
        await characterModel.find().exec()
    )
}
export async function POST({ request }) {

    let char = await request.json();

    if (char._id)
        await characterModel.findByIdAndUpdate(char._id, char).exec()
    else
        await characterModel.create(char)

    return json(request.body)

}
export async function DELETE({ url }) {
    let res = await characterModel.findByIdAndDelete(url.searchParams.get('id')).exec();
    return new Response();
}