// import firebase from '../plugins/firebase'
import { auth } from "../plugins/firebase";

export default {
    async  getUserByCredentials(email, pass){
        const result = await auth.signInWithEmailAndPassword(email, pass);
        return result.user;
    },
    async  createUser(email, pass){
        const result = await auth.createUserWithEmailAndPassword(email, pass);
        return result.user;
    },
    async logout(){
        return auth.signOut();
    }
}