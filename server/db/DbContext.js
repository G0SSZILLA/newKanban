import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import ProfileSchema from "../models/Profile";
import BoardSchema from '../models/Board'
import ListSchema from '../models/List'
import TaskSchema from '../models/Task'
import CommentSchema from '../models/Comment'
class DbContext {
    Values = mongoose.model("Value", ValueSchema);

    Profile = mongoose.model("Profile", ProfileSchema);

    Boards = mongoose.model("Board", BoardSchema);

    Lists = mongoose.model('List', ListSchema);

    Tasks = mongoose.model('Task', TaskSchema);

    Comment = mongoose.model('Comment', TaskSchema)
}


export const dbContext = new DbContext();