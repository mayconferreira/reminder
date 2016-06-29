/* Está é a parte que faz o controle */
var Index = {

    FORM_ID: 'frmReminders',

    init: function () {
        Index.setForm();
        ReminderDAO.load();
        Index.mostrarReminders();
    },

    setForm: function () {
        var form = document.getElementById(Index.FORM_ID);
        if (form) {
            form.onsubmit = function () {
                // Está parte deveria ter algumas validações, sugestão pra melhorar o código.
                var reminder = Index.getReminderForm(form);
                {
                    Index.saveReminderInformacoes(reminder);
                }
                return false;
            };
        }
    },

    getReminderForm: function (form) {
        var reminder = {},

        reminder.id = form.id.value;
        reminder.reminder = form.name.value;
        reminder.date = form.date.value;
        reminder.time = form.time.value;

        return reminder;
    },

    saveReminderInformacoes: function (reminder) {
        if (reminder.id == "") {
            ReminderDAO.add(reminder);
            TableReminder.addNewRow(reminder);
        }
        else {
            ReminderDAO.update(reminder);
            Index.mostrarReminders();
        }
    },

    mostrarReminders: function () {
        var reminders = ReminderDAO.getList(),
            reminder = null;
        if (reminders) {
            for (var i = 0, leng = reminders.length; i < leng; i++) {
                reminder = reminders[i];
                TableReminder.addNewRow(reminder);
            }
        }
    }


};

//initialization method main
Index.init();

//Este evento será acionado quando o usuário não recarregar
// Ou fechar este documento
window.onunload = function () {
    ReminderDAO.save();
};


