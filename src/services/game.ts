import { message } from 'antd';
import { functions } from 'firebase';
import { firestore } from './firebase';

const useRef = firestore.collection('games');
const refUsers = (uid: string) => firestore.doc(`users/${uid}`);

export const creatRoom = async (playerOnce: object, playerTow: object) => {
    try {
        const room = await useRef.add({
            createdAt: new Date(),
            players: [refUsers(playerOnce.uid), refUsers(playerTow.uid)],
        });

        return room.id;
    } catch (error) {
        message.error(error.message);
        console.log('=======creatRoom========', error.message);
    }
};

export const getPlayersInRoom = async (roomId: string) => {
    try {
        let data = await useRef.doc(roomId).get();
        let { players } = data.data() || {};

        let player1 = (await players[0].get()) as User;
        let player2 = (await players[1].get()) as User;

        return [player1.data(), player2.data()];
    } catch (error) {
        message.error(error.message);
        return [];
    }
};

export const endGame = async (roomId: string, sets: {}, winner: User) => {
    try {
        await useRef.doc(roomId).update({
            sets,
            winner: refUsers(winner.uid),
            finishedAt: new Date(),
        });
    } catch (error) {
        message.error(error.message);
    }
};
