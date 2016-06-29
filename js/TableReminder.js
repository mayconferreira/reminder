/*Está é a parte que se trabalha com a tabela */
var TableReminder = {

	ID: 'remindersList',

	addNewRow: function (reminder) {
		var tableReminder = document.getElementById(TableReminder.ID),
			tbody = tableReminder.tBodies[0] || document.createElement('tbody'),
			trow = document.createElement('tr'),
			reminder = document.createElement('td'),
			date = reminder.cloneNode(false),
			time = reminder.cloneNode(false),
			acoes = reminder.cloneNode(false);

		reminder.innerHTML = reminder.reminder;
		date.innerHTML = reminder.date;
		time.innerHTML = reminder.time;
		acoes.className = "acoes";
		Table.createAcoes(acoes, reminder);

		trow.appendChild(reminder);
		trow.appendChild(date);
		trow.appendChild(time);
		trow.appendChild(acoes);

		tbody.appendChild(trow);
		table.appendChild(tbody);
	},

	createAcoes: function (acoes, reminder) {
		var imageDeleteReminder = new Image(),
			imageEditReminder = new Image();

		imageDeleteReminder.src = 'images/deletereminder.png';
		imageDeleteReminder.alt = reminder.id;

		imageEditReminder.src = 'images/editreminder.png';
		imageEditReminder.alt = reminder.id;

		TableReminder.setEditAcoes(imageEditReminder);
		TableReminder.setDeleteAcoes(imageDeleteReminder);

		acoes.appendChild(imageEditReminder);
		acoes.appendChild(imageDeleteReminder);
	},

	setDeleteAcoes: function (imageDeleteReminder) {
		imageDeleteReminder.onclick = function () {
			if (confirm("Você quer deletar o reminder(lembrete)?")) {
				var reminderId = this.alt,
					tr = this.parentNode.parentNode,
					tbody = tr.parentNode,
					reminder = ReminderDAO.get(reminderId);
				ReminderDAO.remove(reminderId);
				tbody.removeChild(tr);
			}
		};
	},

	setEditAcoes: function (imageEditReminder) {
		imageEditReminder.onclick = function () {
			if (confirm("Você quer editar o reminder(lembrete)?")) {
				var reminderId = this.alt,
					reminder = ReminderDAO.get(reminderId),
					input = null,
					property = null;

				for (property in reminder) {
					input = document.getElementById(property);
					if (input && input.nodeName == 'INPUT') {
						input.value = reminder[property];
					}
                }
			}
		};
	}
}