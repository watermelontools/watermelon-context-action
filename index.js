const core = require("@actions/core");
const github = require("@actions/github");

try {
  // `who-to-greet` input defined in action metadata file
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
  fetch("http://app.watermelontools.com/api/jira/getMostRelevantJiraTicket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      user: "estebandalelr@gmail.com",
      prTitle: "WM-49: Create payments success page",
    }),
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
} catch (error) {
  core.setFailed(error.message);
}
