
import firestore from '@react-native-firebase/firestore';
import NetInfo from '@react-native-community/netinfo';
import { getUnsyncedTasks, markTaskSynced } from '../sqlite/database';


export const syncTasksToFirestore = async () => {
    try {
        const network = await NetInfo.fetch();
        console.log(network,'network ... ');
        
         if (!network.isConnected) return; 

         const unsyncedTasks = await getUnsyncedTasks();

         for(const task of unsyncedTasks){
            try {
                await firestore().collection('tasks').doc(task.id).set(task);
                await markTaskSynced(task.id)

            } catch (error) {
                 console.log('Firestore sync error:', error);
            }
         }

    } catch (error) {
        console.log('Sync error:', error);
    }
}