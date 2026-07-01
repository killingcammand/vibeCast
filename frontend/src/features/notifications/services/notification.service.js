import { notificationApi } from "../../../api/notification.api.js";

export const createNotification=async ({recipientID, senderID, type, message, entityID, entityType})=>{
    return await notificationApi.post('/',{recipientID, senderID, type, message, entityID, entityType});
}
export const getNotificationsByRecipientId=async (recipientID)=>{
    return await notificationApi.get(`/${recipientID}`);
}
export const markNotificationAsRead=async (notificationID)=>{
    return await notificationApi.patch(`/${notificationID}/read`);
}
export const deleteNotification=async (notificationID)=>{
    return await notificationApi.delete(`/${notificationID}`);
}
