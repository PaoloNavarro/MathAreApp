import React, { useState, useEffect } from 'react';
import { TextInput, Button, StyleSheet, FlatList, Text } from 'react-native';
import { useAuth } from '@/contexts/AuthContext'; // Ajusta la importación según tu contexto de autenticación
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Ajusta la importación según tu configuración de Firebase

interface SumHistory {
  id: string;
  userId: string;
  number1: number;
  number2: number;
  result: number;
}

const Suma: React.FC = () => {
  const { user } = useAuth();
  const [number1, setNumber1] = useState<string>('');
  const [number2, setNumber2] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<SumHistory[]>([]);

  useEffect(() => {
    if (user) {
      fetchSumHistory(user.uid);
    }
  }, [user]);

  const fetchSumHistory = async (userId: string) => {
    try {
      const q = query(collection(db, 'sumHistory'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const historyData: SumHistory[] = [];
      querySnapshot.forEach((doc) => {
        historyData.push({ id: doc.id, ...doc.data() } as SumHistory);
      });
      setHistory(historyData);
    } catch (error) {
      console.error('Error fetching sum history', error);
    }
  };

  const handleSum = async () => {
    if (!user) return; // Usuario no autenticado, no hacer nada
    const sum = parseInt(number1) + parseInt(number2);
    setResult(sum.toString());
    try {
      await addDoc(collection(db, 'sumHistory'), {
        userId: user.uid,
        number1: parseInt(number1),
        number2: parseInt(number2),
        result: sum,
      });
      fetchSumHistory(user.uid); // Actualiza el historial después de agregar una nueva suma
    } catch (error) {
      console.error('Error adding sum to history', error);
    }
  };

  return (
    <>
      <TextInput
        placeholder="Número 1"
        value={number1}
        onChangeText={setNumber1}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Número 2"
        value={number2}
        onChangeText={setNumber2}
        keyboardType="numeric"
      />
      <Button title="Sumar" onPress={handleSum} />
      <Text>{`Resultado: ${result}`}</Text>
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <Text>{`Suma: ${item.number1} + ${item.number2} = ${item.result}`}</Text>
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default Suma;
