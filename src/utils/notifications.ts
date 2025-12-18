

import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

export const requestNotificationPermission = async () => {
  await notifee.requestPermission();
};

export const scheduleTaskReminder = async (
  title: string,
  body: string,
  triggerTime: number // timestamp
) => {
  const channelId = await notifee.createChannel({
    id: 'tasks',
    name: 'Task Reminders',
    importance: AndroidImportance.HIGH,
  });

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: triggerTime,
  };

  await notifee.createTriggerNotification(
    {
      title,
      body,
      android: {
        channelId,
        pressAction: { id: 'default' },
      },
    },
    trigger
  );
};
