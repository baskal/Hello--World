var myMap = new UIMap();

//login page
myMap.addPageset({
	name: 'LogInPage',
	description: 'logInToMail',
	pathRegexp: 'https://e.mail.ru/'
})
myMap.addElement('LogInPage', {
	name: 'LoginTextBox',
	description: 'LoginTextBox',
	locator: "name=Login"
});
myMap.addElement('LogInPage', {
	name: 'PasswordTextBox',
	description: 'PasswordTextBox',
	locator: 'name=Password'
});
myMap.addElement('LogInPage', {
	name: 'LoginButton',
	description: 'LoginButton',
	locator: '//input[@type="submit"]'
});

//compose message
myMap.addPageset({
	name: 'ComposeMessage',
	description: 'ComposeMessage',
	pathRegexp: 'https://e.mail.ru/compose/'
})
myMap.addElement('ComposeMessage', {
	name: 'ToWhomTextBox',
	description: 'ToWhomTextBox',
	locator: 'css=input.js-input.compose__labels__input'
});
myMap.addElement('ComposeMessage', {
	name: 'SubjectTextBox',
	description: 'SubjectTextBox',
	locator: 'id=compose_222_ab_compose_subj'
});
myMap.addElement('ComposeMessage', {
	name: 'SendMessageButton',
	description: 'SendMessageButton',
	locator: 'css=div.b-toolbar__btn > span.b-toolbar__btn__text'
});
myMap.addElement('ComposeMessage', {
	name: 'SendBlankMessageButton',
	description: 'SendBlankMessageButton',
	locator: 'xpath=(//button[@type="submit"])[22]'
});

//messages
myMap.addPageset({
	name: 'Messages',
	description: 'Inbox, sent, drafts etc',
	pathRegexp: 'https://e.mail.ru/messages/'
});
myMap.addElement('Messages', {
	name: 'Inbox',
	description: 'Inbox',
	locator: 'css=span.b-nav__item__text'
});
myMap.addElement('Messages', {
	name: 'Sent',
	description: 'Sent',
	locator: '//div[@id="b-nav_folders"]/div/a[2]/div/span'
});
myMap.addElement('Messages', {
	name: 'Drafts',
	description: 'Drafts',
	locator: '//div[@id="b-nav_folders"]/div/a[3]/div/span'
});
myMap.addElement('Messages', {
	name: 'Spam',
	description: 'Spam',
	locator: '//div[@id="b-nav_folders"]/div/a[3]/div/span'
});
myMap.addElement('Messages', {
	name: 'Trash',
	description: 'Trash',
	locator: '//div[@id="b-nav_folders"]/div/a[5]/div/span[2]'
});
myMap.addElement('Messages', {
	name: 'LogOutButton',
	description: 'LogOutButton',
	locator: 'id=PH_logoutLink'
});

//trash
myMap.addPageset({
	name: 'Trash',
	description: 'Trash',
	pathRegexp: 'https://e.mail.ru/messages/trash/'
})
myMap.addElement('Trash', {
	name: 'EmptyTheTrashButton',
	description: 'Empty the trashButton',
	locator: 'css=div.b-informer__btn > button.btn.'
});

var manager = new RollupManager();

//log in to mail.ru
manager.addRollupRule({
	name: 'login',
	description: 'log in to mail.ru',
	args: [],
	commandMatchers: [],
	getExpandedCommands: function(args) {
		var commands = [];
	commands.push({
		command: 'open',
		target: 'https://e.mail.ru/'
	});
	commands.push({
		command: 'type',
		target: 'ui=LogInPage::LoginTextBox()',
		value: 'selenium.test1'
		});
	commands.push({
		command: 'type',
		target: 'ui=LogInPage::PasswordTextBox()',
		value: 'selenium123'
	})
	commands.push({
		command: 'clickAndWait',
		target: 'ui=LogInPage::LoginButton()',
	})
		return commands;
	}
});

//delete coockies
manager.addRollupRule({
	name: 'Cookies',
	description: 'Delete all visible cookies',
	args: [],
	commandMatchers: [],
	getExpandedCommands: function(args){
		var commands = [];
	commands.push({
		command: 'deleteAllVisibleCookies'
});
	commands.push({
		command: 'open',
		target: '/'
});
	return commands;
	}
});

//send message
manager.addRollupRule({
	name: 'SendMessage',
	description: 'Write subject of message and send message',
	args:[],
	commandMatchers: [],
	getExpandedCommands: function (args) {
		var commands=[];
	commands.push({
		command: 'type',
		target: 'ui=ComposeMessage::SubjectTextBox()',
		value: 'test',
});
	commands.push({
		command: 'click',
		target: 'ui=ComposeMessage::SendMessageButton()',
});
	commands.push({
		command: 'clickAndWait',
		target: 'ui=ComposeMessage::SendBlankMessageButton()',
});
	return commands;
}
})

//emty the trash
manager.addRollupRule({
	name: 'EmptyTheTrash',
	description: 'Empty the trash',
	args:[],
	commandMatchers: [],
	getExpandedCommands: function (args) {
		var commands=[];
	commands.push({
		command: 'open',
		target: '/messages/trash/'
});
	commands.push({
		command: 'assertElementPresent',
		target: 'ui=Trash::EmptyTheTrashButton()'
})
	commands.push({
		command: 'click',
		target: 'ui=Trash::EmptyTheTrashButton()'
})
	commands.push({
		command: 'waitForElementNotPresent',
		target: 'ui=Trash::EmptyTheTrashButton()'
})
return commands;
}
})

