import { list, store, update } from "$lib/db/mongo";
import { json } from "@sveltejs/kit";

export async function GET() {
    return json(
        await list('characters')
    )
}
export async function POST({ request }) {

    let char = await request.json();

    if (char._id)
        await update('characters', char)
    else
        await store('characters', char)

    return json(request.body)

}