import getGithub from "./getData/github";
import getJira from "./getData/jira";
import getSlack from "./getData/slack";

const core = require("@actions/core");
const github = require("@actions/github");
try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.event, undefined, 2);
  let textToWrite = "## Context by Watermelon\n";
  console.log(`The event event: ${payload}`);
  core.setOutput("issuenumber", github.event.pull_request.number);
  let getDataPromises = [getGithub(), getJira(), getSlack()];
  Promise.all(getDataPromises)
    .then((values) => {
      values.forEach((value) => {
        textToWrite += value;
        textToWrite += "\n";
      });
    })
    .catch((error) => {
      console.log(error.message);
    })
    .finally(() => {
      core.setOutput("textToWrite", textToWrite);
    });
} catch (error) {
  core.setFailed(error.message);
}
