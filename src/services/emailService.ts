import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { error } from 'console';
require('dotenv').config();

console.log(process.env.aws_access_key_id);

const ses = new SESClient({ region: 'ap-northeast-2' });

function createSendEmailCommend(toAddress: string, fromAddress: string, message: string) {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress],
    },
    Source: fromAddress,
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: 'Your one-time password',
      },
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: message,
        },
      },
    },
  });
}

export async function sendEmailToken(email: string, token: string) {
  console.log('email: ', email, token);

  const message = `Your one time password: ${token}`;

  const commend = createSendEmailCommend(email, 'liuxin85@gmail.com', message);

  try {
    return await ses.send(commend);
  } catch (e) {
    console.log('Error sending email', e);
    return error;
  }
}
