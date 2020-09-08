import {Moment} from 'moment';
import Language from './Language';
import Framework from './Framework';
import Category from './Category';
import TypeArticle from './TypeArticle';

export class Search {
searchString : String;
dateCreate : Date;
dateModif: Date;
language: Language[];
framework: Framework[];
category:Category[];
popularity: number[];
type:TypeArticle[];

constructor(){
}
}