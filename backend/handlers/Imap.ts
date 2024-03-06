const imaps = require('imap-simple');
const _ = require('lodash');
const simpleParser = require('mailparser').simpleParser;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

type IMap = {
	link: string;
	code: string;
}

let message = {
	link: '',
	code: ''
} as IMap;

async function getEmails(email: string, password: string) {
	const config = {
		imap: {
			user: email,
			password: password,
			host: 'outlook.office365.com',
			port: 993,
			tls: true,
			authTimeout: 40000
		}
	};
	console.log(1);

	let connection = await imaps.connect(config);
	console.log(2);
	await connection.openBox('INBOX');

	const searchCriteria = ["ALL", ['FROM', 'accounts@albiononline.com']];
	const fetchOptions = {
		bodies: ['HEADER', 'TEXT', ''],
		markSeen: true
	};
	console.log(email, password);
	
	const messages = connection.search(searchCriteria, fetchOptions);
	console.log(3);

	// reversing because the last occurrencies will be applied and not be overwritten by older ones
	const reversedMessages = messages.reverse();
	for (let i = 0; i < reversedMessages.length; i++) {
		const item = reversedMessages[i];
		const all = _.find(item.parts, { "which": "" });
		const id = item.attributes.uid;
		const idHeader = "Imap-Id: " + id + "\r\n";

		const email = await simpleParser(idHeader + all.body);
		const subject = email.subject.toLowerCase();
		const htmlAsText = email.textAsHtml;
		const dom = new JSDOM(htmlAsText);
		console.log(subject);
		
		if (subject.includes("device") || subject.includes("dispositivo")) {
			const outsideHTML = dom.window.document.documentElement.outerHTML;
			const regex = /[A-Z0-9]{7}/;
			const codeMatch = outsideHTML.match(regex);

			message = {
				...(message ?? {}),
				code: codeMatch[0] ? codeMatch[0] : 'No code found'
			}
		}

		if (subject.includes("conta") || subject.includes("account")) {
			const link = dom.window.document.querySelector(`a[href*="https://albiononline.com/register/confirm/"]`).href;

			message = {
				...(message ?? {}),
				link: link ? link : 'No link found'
			}
		}
	}
	await connection.end();
	return message;
}

export default getEmails