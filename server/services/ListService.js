import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class ListService {
    async getListByBoardId(id, email) {
        return await dbContext.Lists.find({ creatorEmail: email, boardId: id }).populate('creator', 'name picture')

    }

    async getAll(userEmail) {
        return await dbContext.Lists.find({ creatorEmail: userEmail }).populate('creator', 'name picture')
    }

    async getById(id, userEmail) {
        let data = await dbContext.Lists.findOne({ _id: id, creatorEmail: userEmail })
        if (!data) {
            throw new BadRequest('Invalid ID or you do not own this board')
        }
        return data
    }

    async create(rawData) {
        let data = await dbContext.Lists.create(rawData)
        return data
    }

    async edit(id, userEmail, update) {
        let data = await dbContext.Lists.findByIdAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
        if (!data) {
            throw new BadRequest('Invalid ID or you do not own this board')
        }
        return data
    }
    async delete(id) {
        let data = await dbContext.Lists.findByIdAndRemove({ _id: id })
        if (!data) {
            throw new BadRequest('Invalid ID or you do not own this board')
        }
    }

    async deleteListByBoardId(id, userEmail) {
        let data = await dbContext.Lists.findByIdAndRemove({ _id: id, creatorEmail: userEmail })
        if (!data) {
            throw new BadRequest('Invalid ID or you do not own this board')
        }
    }

}

export const listService = new ListService()