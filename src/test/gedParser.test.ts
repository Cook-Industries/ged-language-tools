import { resolveElementAtOffset } from "../parser/gedParser";

const json = `
{
  "type": "content",
  "children": [
    {
      "type": "button",
      "parameters": {
        "text": "Save"
      }
    }
  ]
}
`;

const offset = json.indexOf("Save");

console.log(resolveElementAtOffset(json, offset));
