import React from 'react';
import { auth } from './services/firebase';

export async function getInitialState(): Promise<{
    currentUser?: firebase.User | null;
}> {
    try {
        const currentUser = auth.currentUser;
        console.log('INIT STATE', currentUser);
        return {
            currentUser,
        };
    } catch (error) {}
    return {};
}
