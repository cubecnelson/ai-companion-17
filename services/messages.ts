import { 
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Message {
  id?: string;
  text: string;
  userId: string;
  companionId: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  read: boolean;
}

export const sendMessage = async (message: Omit<Message, 'id' | 'timestamp'>) => {
  try {
    const docRef = await addDoc(collection(db, 'messages'), {
      ...message,
      timestamp: new Date()
    });
    return docRef.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getMessages = async (userId: string, companionId: string) => {
  try {
    const q = query(
      collection(db, 'messages'),
      where('userId', '==', userId),
      where('companionId', '==', companionId),
      orderBy('timestamp', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Message[];
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const markMessageAsRead = async (messageId: string) => {
  try {
    const messageRef = doc(db, 'messages', messageId);
    await updateDoc(messageRef, {
      read: true
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};