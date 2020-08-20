import Article from '../model/Article'
import { roleType } from '../enum/roleType';
import {Moment} from 'moment';
import Etat from './Etat';
import Framework from './Framework';
import Language from './Language';
import Type from './Type';
import Category from './Category';


export default class UserCreate {
    id : number;
    nom : string;
    prenom : string;
    pseudo: string;
    mail: string; //ce qui permet l'auth par la suite
    motDePasse: string; 
    lienLinkedin: string;
    statut: string;
    dateInscription: Moment;
    dateDerniereConnexion: Moment;
    preferences : string[];
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

    hydrate(user: Object){
        this.id = user['idUtilisateur']
        this.nom = user['nom'];
        this.prenom = user['prenom'];
        this.pseudo = user['pseudo'];
        this.mail = user['mail'];
        this.lienLinkedin = user['lienLinkedin'];
        this.statut = user['statut'];
        this.dateInscription = user['dateInscription'];
        this.preferences = user['preferences'];
        this.etat = user['etat'];
        this.role = user['role'];
        this.framework = user['framework'];
        this.langage = user['langage'];
        this.type = user['type'];
        this.categorie = user['categorie'];
    }
}