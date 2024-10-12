import dotenv from 'dotenv';
import {requestUtility} from '../utilities';
import {ErrorHelper} from '../helpers';
import mailJet from 'node-mailjet';

dotenv.config();
class  MessagingService{
    apiKey = process.env.ONE_SIGNAL_API_KEY;
    appId= process.env.ONE_SIGNAL_APP_ID;
    baseUrl = process.env.ONE_SIGNAL_API_BASE_URL;
    smsEndpoint = process.env.ONE_SIGNAL_SMS_ENDPOINT;
    smsFrom = process.env.SMS_FROM_NUMBER;
    headers = {
        'content-Type': 'application/json; charset=utf8',
        'Authorization': `Basic ${this.apiKey}`
    };
    async sendSms({payload}){
        try {
            const data ={
                app_id: this.appId,
                name: payload.name,
                sms_from: this.smsFrom,
                content: payload.content,
                include_phone_number: [payload.phoneNumber]
            };
           return await requestUtility.makeRequest(`${this.baseUrl}/${this.smsEndpoint}`, {
                headers: this.headers,
                data
            });
        }catch (e){
            return new ErrorHelper(
                `Error occurred: ${e}`,
                500
            );
        }
    }
    async sendMail(payload){
        try {
            const client = mailJet.apiConnect(process.env.MAILJET_APIKEY, process.env.MAILJET_SECRET_KEY);
            return await client.post('send', {version: 'v3.1'}).request({
                'Messages': [
                    {
                        'From': {
                            'Email':'alombangwingche@gmail.com',
                            'Name':'Austrilain Placement Inc'
                        },
                        'To': [
                            {
                                'Email':payload.email,
                                'Name':payload.username
                            }
                        ],
                        'Subject': 'Job Application accepted',
                        'TextPart': 'Job Application accepted',
                        'HTMLPart':`
                        <div style="font-family: Helvetica,Arial,sans-serif;width:100%;overflow:auto;line-height:2">
                          <div style="margin:10px auto;padding:2% 7%">
                            <div style="border-bottom:1px solid #eee">
                              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Otp Code</a>
                            </div>
                            <p style="font-size:1.1em">Hi, ${payload.username}</p>
                            <p>We are please to announce to you that, following your application for the ${payload.job} job.<br />  Please reply to this email with the following info or contact the system admin on WhatsApp to complete your application process</p>
                            <h2 style="background: #00466a;margin: 10px auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">support@australiaplacement.com</h2>
                            <p style="font-size:0.9em;">Regards,<br />Austrialian Placement</p>
                            <hr style="border:none;border-top:1px solid #eee" />
                            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                              <p style="margin:0.5rem;">Australian Placement Inc</p>
                              <p style="margin:0.5rem;;"></p>
                              <p style="margin:0.5rem;"></p>
                            </div>
                          </div>
                        </div>
                        `
                    }
                ]
            });
        } catch (e) {
            throw new Error(e);
        }
    }
}

export const messagingService = {
    sendSms: async (payload) => await new MessagingService().sendSms(payload),
    sendEmail: async (payload) => await new MessagingService().sendMail(payload)
};