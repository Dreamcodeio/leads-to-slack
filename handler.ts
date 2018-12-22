import { APIGatewayEvent } from "aws-lambda";
import { IncomingWebhook } from "@slack/client";

const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;
const CAMPANY_LOGO = process.env.CAMPANY_LOGO;
const CAMPANY_WEBSITE = process.env.CAMPANY_WEBSITE;
const LEAD_DETAILS = "Lead Details";

const webhook = new IncomingWebhook(SLACK_WEBHOOK);

export async function sendLead(event: APIGatewayEvent) {
  console.log(JSON.stringify(event));
  const leadBody = JSON.parse(event.body);
  await webhook.send({
    attachments: [
      {
        author_name: LEAD_DETAILS,
        fields: Object.keys(leadBody).map(key => ({
          title: key,
          value: leadBody[key],
          short: true
        })),
        footer: CAMPANY_WEBSITE,
        footer_icon: CAMPANY_LOGO
      }
    ]
  });
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify({ data: "OK" }),
    isBase64Encoded: false
  };
}
