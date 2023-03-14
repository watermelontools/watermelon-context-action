const core = require("@actions/core");
const github = require("@actions/github");

const axios = require("axios");
export default async function getContext() {
  let textToWrite = "";
  console.log(github.event);
  await axios
    .post("http://app.watermelontools.com/api/actions/getContext", {
      user: github.event.payload.pull_request.user.login,
      repo: github.event.payload.repository.name,
      owner: github.event.payload.repository.owner.login,
      commitList: "264ef7c1455b51f1cb65d4457aeaa700478c91f4",
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.message);
    });
  await axios
    .get(github.event.payload.pull_request.commits.href)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.message);
    });
  return true;
}
