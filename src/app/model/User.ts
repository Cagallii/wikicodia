import Article from '../model/Article'
import { roleType } from '../enum/roleType';
import {Moment} from 'moment';
import Etat from './Etat';
import Framework from './Framework';
import Language from './Language';
import Type from './Type';
import Category from './Category';


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
    role: roleType;
    framework : Framework[];
    langage : Language[];
    type : Type[];
    categorie : Category[];
    //guilde
    //articlesCreated: Article[];
    //articlesFavoris: Article[];
    // actif ???
    //vote: number;
    //avatar : boolean; //any //string pour URL?
}