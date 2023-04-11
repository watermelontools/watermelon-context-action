import getContext from "./getData/context";

const core = require("@actions/core");
const github = require("@actions/github");
try {
  let textToWrite = "## Context by Watermelon\n";
  let getDataPromises = [getContext()];
  Promise.all(getDataPromises)
    .then((values) => {
      console.log("Got context");
      values.forEach((value) => {
        textToWrite += value;
        textToWrite += "\n";
      });
    })
    .catch((error) => {
      console.log("Context error", error);
    })
    .finally(() => {
      core.setOutput("textToWrite", textToWrite);
    });
} catch (error) {
  console.log("Promise error");
  core.setFailed(error);
}
