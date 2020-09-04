import Article from './Article'
import { roleType } from '../enum/roleType';
import {Moment} from 'moment';
import Etat from './Etat';
import Framework from './Framework';
import Language from './Language';
import Type from './TypeArticle';
import Category from './Category';
import RoleUser from './RoleUser';
import Guilde from './Guilde';
import TypeArticle from './TypeArticle';


export default class UserCreate {
    idUtilisateur : number;
    nom : string;
    prenom : string;
    pseudo: string;
    mail: string; //ce qui permet l'auth par la suite
    motDePasse: string; 
    lienLinkedin: string;
    statut: string;
    dateInscription: Moment;
    dateDerniereConnexion: Moment;
    etat : Etat;
    role: RoleUser;
    guilde:Guilde[];
    framework : Framework[];
    langage : Language[];
    type : TypeArticle[];
    categorie : Category[];
    articlesFavoris : Article[];

}