import {Moment} from 'moment';
import UserCreate from './User';
import {articleType} from '../enum/articleType'
import {languageType} from '../enum/languageType'
import { category } from '../enum/category';

export default class Article {
    creationDate: Moment;
    lastUpdateDate: Moment; //???
    author: UserCreate;
    title: string;
    type: articleType;
    language: languageType[];
    versionLanguage: string[]; 
    versionFramework: string[];
    category: category;
    content: string;
    description: string;
    isValidated: boolean;
    like: number;
    dislike: number;
    
}