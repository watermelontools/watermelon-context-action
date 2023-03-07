const axios = require("axios");
export default async function getSlack() {
  let textToWrite = "";
  await axios
    .post("http://app.watermelontools.com/api/slack/searchMessagesByText", {
      user: "estebandalelr@gmail.com",
      text: "action github",
    })
    .then((response) => {
      textToWrite += "**Slack Treads**";
      for (
        let index = 0;
        index < response.data.messages.matches.length;
        index++
      ) {
        const element = response.data.messages.matches[index];
        textToWrite += `\n[#${element.username} - ${element.text}](${element.permalink})`;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
  return textToWrite;
}
