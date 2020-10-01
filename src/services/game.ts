import { message } from 'antd';
import { firestore } from './firebase';
const useRef = firestore.collection('users');

export const searchPlayer = async (name: string) => {
    try {
        let snapshot = await useRef.where('displayName', '==', name).get();
        console.log(snapshot);

        if (snapshot.empty) {
            message.error('No match documents.');
            return;
        }

        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
        });
    } catch (error) {
        message.error(error.message);
    }
};

export const getPlayer = async () => {
    try {
        let snapshot = await useRef.get();

        if (snapshot.empty) {
            message.error('Connection errors');
        }

        let listPlayer: any[] = [];
        snapshot.forEach(doc => {
            listPlayer.push(doc.data());
        });

        return listPlayer;
    } catch (error) {
        message.error(error.message);
    }
};
