import mongoose from "mongoose"
import { dbContext } from "../db/DbContext"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const List = new Schema({
    title: { type: String, required: true },
    creatorEmail: { type: String, required: true },
    boardId: { type: ObjectId, ref: 'Board', required: true },
    // listId: { type: ObjectId, ref: 'Lists', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })


List.virtual("creator", {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
})

//CASCADE ON DELETE
List.pre('deleteMany', function(next) {
    //lets us find all the lists and remove them and orphans
    Promise.all([
            //something like...
            // @ts-ignore
            dbContext.Tasks.deleteMany({ listId: this._conditions_id }),
        ])
        .then(() => next())
        .catch(err => next(err))
})

//CASCADE ON DELETE
List.pre('findOneAndRemove', function(next) {
    //lets us find the list and remove it
    Promise.all([
            // @ts-ignore
            dbContext.Lists.findOneAndRemove({ listId: this._conditions._id })
        ])
        .then(() => next())
        .catch(err => next(err))
})

export default List;