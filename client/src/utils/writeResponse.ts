import fs from 'fs';
import path from 'path';

/**
 * Writes the response from the API to a local file.
 *
 * @param modelId The ID of the model to write the response for.
 * @param response The response from the API.
 */

interface writeOptions {
  modelId: string;
  response: any;
}

export default async function write({ modelId, response }: writeOptions) {
  const outputDir = path.join(__dirname, "../../output");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  fs.writeFile(
    path.join(outputDir, `${modelId}.json`),
    JSON.stringify(response),
    function (err) {
      if (err) return console.log(err);
      console.log(`Writing to ${modelId}.json`);
    }
  );
}

/***
  @COPYRIGHT (c) 2024. Thomas EC. Smith (https://www.TECSmith.uk). All rights reserved.
****/
