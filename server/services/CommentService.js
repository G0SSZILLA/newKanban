import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class CommentService {
    async getCommentByTaskId(id, userEmail) {
            return await dbContext.Comment.find({ listId: id, creatorEmail: userEmail })
                // .populate('creator', 'name', 'picture')
        }
        // async getAll(userEmail) {
        //     return await dbContext.Tasks.find({ creatorEmail: userEmail }).populate("creator", "name picture")
        // }

    async getById(id, userEmail) {
        let data = await dbContext.Comment.findOne({ _id: id, creatorEmail: userEmail })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this board")
        }
        return data
    }

    async create(rawData) {
        let data = await dbContext.Comment.create(rawData)
        return data
    }

    async edit(id, userEmail, update) {
        let data = await dbContext.Comment.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this board");
        }
        return data;
    }

    async delete(id, userEmail) {
        let data = await dbContext.Comment.findOneAndRemove({ _id: id, creatorEmail: userEmail });
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this board");
        }
        return data
    }

}


export const commentService = new CommentService()