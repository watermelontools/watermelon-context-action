const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");
try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  let textToWrite = "";
  console.log(`The event payload: ${payload}`);
  axios
    .post("http://app.watermelontools.com/api/jira/getMostRelevantJiraTicket", {
      user: "estebandalelr@gmail.com",
      prTitle: "WM-49: Create payments success page",
    })
    .then((response) => {
      let jiraText = "**Jira**";
      for (let index = 0; index < response.data.length; index++) {
        const element = response.data[index];
        jiraText += `\n[${element.key} - ${element.fields.summary}](${element.serverInfo.baseUrl}/browse/${element.key})`;
      }
      textToWrite += jiraText;
      core.setOutput("textToWrite", textToWrite);
    });
} catch (error) {
  core.setFailed(error.message);
}
