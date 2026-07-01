import Notification from '../models/notification.models.js';

export const createNotificationService = async ({ recipientID, senderID, type, message, entityID, entityType}) => {
    try {
        const notification = new Notification({recipientID, senderID, type, message, entityID, entityType});
        await notification.save();
        return notification;
    }
    catch (error) {
        console.error('Error creating notification:', error);
        throw error;
    }
};

export const getNotificationsByRecipientIdService = async (recipientID) => {
    try {
        const notifications = await Notification.find({ recipientID }).sort({ createdAt: -1 });
        return notifications;
    }
    catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};

export const markNotificationAsReadService = async (notificationID) => {
    try {
        const notification = await Notification.findByIdAndUpdate(notificationID, { read: true }, { new: true });
        return notification;
    }
    catch (error) {
        console.error('Error marking notification as read:', error);
        throw error;
    }
};

export const deleteNotificationService = async (notificationId) => {
    try {
        await Notification.findByIdAndDelete(notificationId);
    }
    catch (error) {
        console.error('Error deleting notification:', error);
        throw error;
    }
};

