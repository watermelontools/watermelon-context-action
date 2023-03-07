const axios = require("axios");
export default async function getJira() {
  let textToWrite = "";
  await axios
    .post("http://app.watermelontools.com/api/jira/getMostRelevantJiraTicket", {
      user: "estebandalelr@gmail.com",
      prTitle: "WM-49: Create payments success page",
    })
    .then((response) => {
      textToWrite += "**Jira Tickets**";
      for (let index = 0; index < response.data.length; index++) {
        const element = response.data[index];
        textToWrite += `\n[${element.key} - ${element.fields.summary}](${element.serverInfo.baseUrl}/browse/${element.key})`;
        textToWrite += `\n--------------\n`;
        // shortcircuit to three results
        if (index === 2) {
          textToWrite += `and ${response.data.length - 3} more`;
          break;
        }
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
  return textToWrite;
}
