import {Moment} from 'moment';
import UserCreate from './UserCreate';
import {articleType} from '../enum/articleType'
import {languageType} from '../enum/languageType'
import { category } from '../enum/category';
import Vote from './Vote';
import Language from './Language';
import Framework from './Framework';
import Type from './TypeArticle';
import TypeArticle from './TypeArticle';
import Category from './Category';

export default class Article {

    idArticle: number;
    titre: string;
    description: string;
    contenu: string;
    dateCreation: Moment;
    dateDerniereModif: Moment; //???
    estPublie:Boolean;
    estPromu:Boolean;
    estValide:Boolean;
    vote:Vote[];
    langage:Language;
    framework:Framework;
    auteur: UserCreate;
    type: TypeArticle;
    categorie:Category;
    comAdmin: string;    
}