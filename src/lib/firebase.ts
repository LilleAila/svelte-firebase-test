import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { derived, writable, type Readable } from "svelte/store";

const firebaseConfig = {
  apiKey: "AIzaSyCrVN6S1YawobYIlYM2YrsyWm40pIP2CBE",
  authDomain: "svelte-fireship-49968.firebaseapp.com",
  projectId: "svelte-fireship-49968",
  storageBucket: "svelte-fireship-49968.appspot.com",
  messagingSenderId: "925760253459",
  appId: "1:925760253459:web:15467e38580af2854559e6",
  measurementId: "G-2EGWYC8QQY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

/**
 * @returns a store with the current firebase user
 */
function userStore() {
    let unsubscribe: () => void;

    if (!auth || !globalThis.window) {
        console.warn("Auth is not initialized or not in browser");
        const { subscribe } = writable<User | null>(null);
        return {
            subscribe,
        }
    }

    const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
        unsubscribe = onAuthStateChanged(auth, (user) => {
            set(user);
        });

        return () => unsubscribe();
    });

    return {
        subscribe,
    }
}

export const user = userStore();

/**
 * @param {string} path document path or reference
 * @returns a store with realtime updates on document data
*/
export function docStore<T>(
    path: string,
) {
    let unsubscribe: () => void;

    const docRef = doc(db, path);

    const { subscribe } = writable<T | null>(null, (set) => {
        unsubscribe = onSnapshot(docRef, (snapshot) => {
            set((snapshot.data() as T) ?? null);
        });

        return () => unsubscribe();
    });

    return {
        subscribe,
        ref: docRef,
        id: docRef.id,
    }
}

interface UserData {
    username: string;
    bio: string;
    photoURL: string;
    links: any[];
}

export const userData: Readable<UserData | null> = derived(user, ($user, set) => {
    if($user) {
        return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
    } else {
        set(null);
    }
});