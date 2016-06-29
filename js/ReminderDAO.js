
var ReminderDAO = {

    STORAGE_KEY: 'reminders',
    reminders: [], // ArrayList simples

    add: function (reminder) {
        reminder.id = ReminderDAO.generateId();
        ReminderDAO.reminders.push(reminder);
    },

    generateId: function () {
        var id = (new Date()).getTime();
        return id;
    },

    get: function (reminderId) {
        var reminderIndex = ReminderDAO.getReminderIndex(reminderId),
            reminder = null;

        if (reminderIndex > -1) {
            reminder = ReminderDAO.reminders[reminderIndex];
        }

        return reminder;
    },


    getReminderIndex: function (reminderId) {
        var reminders = ReminderDAO.reminders,
            reminder = null,
            reminderIndex = reminders.length;

        while (reminderIndex--) {
            reminder = reminders[reminderIndex];
            if (reminder.id == reminderId) {
                return reminderIndex;
            }
        }

        return null;
    },

    load: function () {
        var remindersStr = localStorage.getItem(ReminderDAO.STORAGE_KEY);
        ReminderDAO.reminders = JSON.parse(remindersStr);
        if (ReminderDAO.reminders) {
            return true;
        }
        ReminderDAO.reminders = [];
        return false;
    },

    getList: function () {
        return ReminderDAO.reminders;
    },

    remove: function (reminderId) {
        var reminders = ReminderDAO.reminders,
            reminderIndex = ReminderDAO.getReminderIndex(reminderId);

        if (reminderIndex > -1) {
            reminders.splice(reminderIndex, 1);
            return true;
        }

        return false;
    },

    save: function () {
        var reminder = ReminderDAO.reminders;
        localStorage.setItem(ReminderDAO.STORAGE_KEY, JSON.stringify(reminders));
    },

    update: function (reminder) {
        var reminderIndex = ReminderDAO.getReminderIndex(reminder.id);
        if (reminderIndex > -1) {
            RemeinderDAO.reminders[reminderIndex] = reminder;
            return true;
        }
        return false;
    }

};
