import express from "express";
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { commentService } from "../services/CommentService";

export class CommentController extends BaseController {

    constructor() {
        super('api/comments')
        this.router
            .use(auth0provider.getAuthorizedUserInfo)
            // .get("", this.getAll)
            .get("/:id", this.getById)
            .post("", this.create)
            .put("/:id", this.edit)
            .delete("/:id", this.delete)
    }


    async getById(req, res, next) {
        try {
            let data = await commentService.getById(req.params.id, req.userInfo.email)
            return res.send(data)
        } catch (error) { next(error) }
    }

    // async getListByBoardId(req, res, next) {
    //     try {
    //         let data = await listService.getListByBoardId(req.params.id, req.userInfo.email)
    //         return res.send(data)
    //     } catch (error) { next(error) }
    // }

    async create(req, res, next) {
        try {
            req.body.creatorEmail = req.userInfo.email
            let data = await commentService.create(req.body)
            return res.status(201).send(data)
        } catch (error) { next(error) }
    }

    async edit(req, res, next) {
        try {
            let data = await commentService.edit(req.params.id, req.userInfo.email, req.body)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async delete(req, res, next) {
        try {
            await commentService.delete(req.params.id, req.userInfo.email)
            return res.send("Successfully deleted")
        } catch (error) { next(error) }
    }



}