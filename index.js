const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");
try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
  axios
    .post("http://app.watermelontools.com/api/jira/getMostRelevantJiraTicket", {
      user: "estebandalelr@gmail.com",
      prTitle: "WM-49: Create payments success page",
    })
    .then((response) => {
      let textToWrite = `*Jira*
         ${response.data[0].key} ${
        response.data[0].fields?.summary
          ? `: ${response.data[0].fields?.summary}`
          : ""
      }}`;
      core.setOutput("ghdata", textToWrite);
    });
} catch (error) {
  core.setFailed(error.message);
}
