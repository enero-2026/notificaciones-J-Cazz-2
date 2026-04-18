import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState, useEffect } from 'react'; 
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const pedirPermiso = async () => {
  await Notifications.requestPermissionsAsync();
};

const enviarNotificacion = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hola, mundo 🌍",
      body: "Esta es tu primera notificación",
    },
    trigger: null,
  });
};

// 👇 recibe el valor como parámetro
const enviarContador = async (valor) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "El contador incrementó",
      body: `El contador está en: ${valor}`, // 👈 template string correcto
    },
    trigger: null,
  });
};

export default function App() {
  
  const [contador, setContador] = useState(0);

  useEffect(() => {
    cargarContador();
  }, []);

  useEffect(() => {
    guardarContador(contador);
  }, [contador]);

  const incrementar = () => {
    const nuevoValor = contador + 1;
    setContador(nuevoValor);
    enviarContador(nuevoValor); // 👈 se llama con paréntesis y pasa el valor
  };

  const guardarContador = async (valor) => {
    try {
      await AsyncStorage.setItem("contador", JSON.stringify(valor));
    } catch (e) {
      console.log("Error guardando");
    }
  };

  const cargarContador = async () => {
    try {
      const data = await AsyncStorage.getItem("contador");
      if (data !== null) {
        setContador(JSON.parse(data));
      }
    } catch (e) {
      console.log("Error cargando");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Notificaciones</Text>
      <Button title="Pedir permiso" onPress={pedirPermiso} />
      <Button title="Enviar notificación" onPress={enviarNotificacion} />
      <Text style={{ fontSize: 20 }}>Contador: {contador}</Text>
      <Button title="Incrementar" onPress={incrementar} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});