import Article from '../model/Article'
import { roleType } from '../enum/roleType';
import {Moment} from 'moment';

export default class UserCreate {
    lastname : string;
    firstname : string;
    username: string;
    role: roleType;
    isAdministrator: boolean;
    email: string; //ce qui permet l'auth par la suite
    linkedin: string;
    preferences : string[];
    //guilde
    articlesCreated: Article[];
    articlesFavoris: Article[];
    // actif ???
    vote: number;
    password: string; 
    avatar : boolean; //any //string pour URL?
    registryDate: Moment;
    lastConnect: Moment;
}