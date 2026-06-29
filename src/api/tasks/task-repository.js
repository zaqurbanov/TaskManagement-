import BaseRepository from "../../core/base-repository.js";
import { TaskModel } from "./task-model.js";

export default class TaskRepository extends BaseRepository {
    constructor() {
        super(TaskModel)
    }
}
