import { auth, firestore, storage } from './firebase';
import { message } from 'antd';

const usersRef = firestore.collection('users');

export const login = async (email: string, password: string) => {
    try {
        const user = await auth.signInWithEmailAndPassword(email, password);
        await usersRef.doc(user.user?.uid).update({
            status: 'online',
            lastLoginAt: Date.now(),
        });
        return user.user;
    } catch (error) {
        message.error(error.message);
        return error.message;
    }
};

export const register = async (email: string, password: string) => {
    try {
        const user = await auth.createUserWithEmailAndPassword(email, password);
        const userInfo = (user.user || {}) as User;
        await usersRef.doc(userInfo.uid).set({
            uid: userInfo.uid,
            email: userInfo.email,
            score: 0,
        });
        return userInfo;
    } catch (error) {
        console.log(error);
        message.error(error.message);
        return error.message;
    }
};

export const uploadAvatar = async (file: File, userId: string) => {
    const ref = storage.ref('/users/' + userId + '/profile/avatar.jpg');
    try {
        const snap = await ref.put(file, {
            contentType: 'image/jpeg',
        });
        return snap.ref.getDownloadURL();
    } catch (error) {
        message.error(error.message);
        return;
    }
};

export const updateProfile = async (displayName: string, photoURL: string) => {
    try {
        const user = auth.currentUser;
        if (!user) return 'User is not logged in!';
        await user.updateProfile({
            displayName,
            photoURL,
        });
        await usersRef.doc(user.uid).update({
            displayName,
            photoURL,
        });
        return auth.currentUser;
    } catch (error) {
        message.error(error.message);
        return error.message;
    }
};

export const getPlayers = async () => {
    let listPlayer = [] as User[];
    try {
        let snapshot = await usersRef.get();

        if (snapshot.empty) {
            message.error('Connection errors');
        }

        snapshot.forEach(doc => {
            listPlayer.push(doc.data() as User);
        });
    } catch (error) {
        message.error(error.message);
    }
    return listPlayer.sort(
        (a, b) => (b.lastLoginAt || 0) - (a.lastLoginAt || 0),
    );
};

export const logout = () => auth.signOut();
