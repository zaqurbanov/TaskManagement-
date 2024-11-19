import BaseRepository from "../../core/base-repository.";
import { UserModel } from "./model/user-model.js";


export default class UserRepository extends BaseRepository{
    constructor(){
        super(UserModel)
    }
} 