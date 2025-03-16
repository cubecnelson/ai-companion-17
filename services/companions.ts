import { 
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Companion {
  id?: string;
  name: string;
  description: string;
  avatar: string;
  userId: string;
  personality: string[];
  languages: { id: string; proficiency: string }[];
  tone: string;
  prompts: string[];
  createdAt: Date;
}

export const createCompanion = async (companion: Omit<Companion, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'companions'), {
      ...companion,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateCompanion = async (id: string, data: Partial<Companion>) => {
  try {
    const companionRef = doc(db, 'companions', id);
    await updateDoc(companionRef, data);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteCompanion = async (id: string) => {
  try {
    const companionRef = doc(db, 'companions', id);
    await deleteDoc(companionRef);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserCompanions = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'companions'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Companion[];
  } catch (error: any) {
    throw new Error(error.message);
  }
};