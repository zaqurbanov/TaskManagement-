import BaseRepository from "../../core/base-repository.js";
import { UserModel } from "./model/user-model.js";


export default class UserRepository extends BaseRepository{
    constructor(){
        super(UserModel)
    }
} 