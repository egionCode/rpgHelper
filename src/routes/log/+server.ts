import { json } from "@sveltejs/kit";
import logModel from "$lib/db/model/log";

export async function GET({ url }) {
    var status = url.searchParams.get('status');
    var res;
    if (status)
        res = await logModel.find({ status }).exec()
    else
        res = await logModel.find().exec()


    return json(
        res
    )
}
export async function POST({ request }) {

    let log = await request.json();
    let res: any;
    if (log._id)
        res = await logModel.findByIdAndUpdate(log._id, log).exec()
    else
        res = await logModel.create(log)
    return json(res.toJSON());

}
export async function DELETE({ url }) {
    let res = await logModel.findByIdAndDelete(url.searchParams.get('id')).exec();
    return new Response();
}