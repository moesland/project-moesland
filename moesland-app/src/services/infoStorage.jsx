import * as SecureStore from 'expo-secure-store';
import uuid from 'react-native-uuid';

export const getUniqueId = async () => {
    let fetchId = await SecureStore.getItemAsync("deviceId");
   
    if(fetchId == null) {
        fetchId = uuid.v4();
        await SecureStore.setItemAsync('deviceId', fetchId);
    }

    return fetchId;
};