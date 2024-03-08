import imaps from 'imap-simple';
import _ from 'lodash';
import { simpleParser } from 'mailparser';
import { JSDOM } from 'jsdom';
import util from 'util'

let message = {}

const connectPromise = util.promisify(imaps.connect);
const simpleParserPromise = util.promisify(simpleParser);

async function getEmails(email, password, imapServer) {
  const config = {
    imap: {
      user: email,
      password: password,
      host: imapServer, // outlook.office365.com || imap.gmail.com
      port: 993,
      tls: true,
      authTimeout: 40000
    }
  };
  try {
    let connection = await connectPromise(config);
    await connection.openBox('INBOX');

    const searchCriteria = ["ALL", ['FROM', 'accounts@albiononline.com']];
    const fetchOptions = {
      bodies: ['HEADER', 'TEXT', ''],
      markSeen: true
    };

    const messages = await connection.search(searchCriteria, fetchOptions);

    for (let i = 0; i < messages.length; i++) {
      const item = messages[i];
      const all = _.find(item.parts, { "which": "" });
      const id = item.attributes.uid;
      const idHeader = "Imap-Id: " + id + "\r\n";

      const email = await simpleParserPromise(idHeader + all.body);
      const subject = email.subject.toLowerCase();
      const htmlAsText = email.textAsHtml;
      const dom = new JSDOM(htmlAsText);
      const date = email.date;

      if (subject.includes("device") || subject.includes("dispositivo")) {
        const outsideHTML = dom.window.document.documentElement.outerHTML;
        const regex = /[A-Z0-9]{7}/;
        const codeMatch = outsideHTML.match(regex);

        message = {
          ...(message ?? {}),
          code: codeMatch[0] ? codeMatch[0] : 'No code found'
        };
      }

      if (subject.includes("conta") || subject.includes("account")) {
        const link = dom.window.document.querySelector(`a[href*="https://albiononline.com/register/confirm/"]`).href;

        message = {
          ...(message ?? {}),
          link: link ? link : 'No link found'
        };
      }
    }

    connection.end();
    console.log(JSON.stringify(message).trim());
  } catch (error) {
    console.error(error);
  }


}

const email = process.argv[2] || 'No email provided';
const password = process.argv[3] || 'No password provided';
const imapServer = process.argv[4] || 'No imapServer provided';

await getEmails(email, password, imapServer)