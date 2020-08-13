require("dotenv").config();
const axios = require("axios");
const artifact = require("@actions/artifact");

const { URL: linkToScan } = process.env;

const artifactUp = async () => {
  const artifactClient = artifact.create();
  const artifactName = "output";
  const files = ["/output/output.json"];

  const rootDirectory = "."; // Also possible to use __dirname
  const options = {
    continueOnError: false,
  };

  const results = await artifactClient.uploadArtifact(
    artifactName,
    files,
    rootDirectory,
    options
  );
  return results;
};

const main = async () => {
  console.log(`👀 scanning ${linkToScan}`);

  const carbonData = await axios(
    `https://api.websitecarbon.com/site?url=${linkToScan}`
  );
  console.log(carbonData.data);
};

(async () => {
  await main();
})();
