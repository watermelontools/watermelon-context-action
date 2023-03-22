import getContext from "./getData/context";

const core = require("@actions/core");
const github = require("@actions/github");
try {
  // Get the JSON webhook payload for the event that triggered the workflow
  let textToWrite = "## Context by Watermelon\n";
  let getDataPromises = [getContext()];
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
