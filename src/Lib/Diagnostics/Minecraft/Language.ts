import { DiagnosticsBuilder, DiagnosticSeverity } from "../../../Lib/Types/DiagnosticsBuilder/include";
import { OffsetWord } from "../../Types/OffsetWord";
import { TextDocument } from 'bc-minecraft-bedrock-project';

export function minecraft_language_diagnose(doc: TextDocument, diagnoser: DiagnosticsBuilder): void {
  const keys: OffsetWord[] = [];
  let lastOffset = 0;
  const text = doc.getText();
  const lines = text.split('\n');

  for (let I = 0; I < lines.length; I++) {
    const line = lines[I].trim();
    const offset = text.indexOf(line, lastOffset);
    
    minecraft_language_line_diagnose(OffsetWord.create(line, offset), keys, diagnoser);

    lastOffset = offset + 1;
  }
}

/**
 * 
 * @param line 
 * @param index The line index
 * @param keys 
 * @param diagnoser 
 * @returns 
 */
export function minecraft_language_line_diagnose(line: OffsetWord, keys: OffsetWord[], diagnoser: DiagnosticsBuilder): void {
  //Find comment on line
  let text = line.text;
  const CommentIndex = text.indexOf("#");

  //If comment has been found
  if (CommentIndex >= 0) {
    //Ensuring that comment has started right '##'
    if (text.substring(CommentIndex, CommentIndex + 2) !== "##") {
      diagnoser.Add(line.offset, "A comment is always ##", DiagnosticSeverity.error, "minecraft.language.comment.invalid");
    }

    //Check if the comment doesn't start at the start of the line
    if (CommentIndex > 0) {
      //Comments need to be predicated with a tab if they do not start at the beginning of the line
      if (text.charAt(CommentIndex - 1) !== "\t") {
        diagnoser.Add(line.offset, "Before a comment must be a tab", DiagnosticSeverity.error, "minecraft.language.comment.invalid");
      }
    }

    //Remove comment;
    text = text.substring(0, CommentIndex).trim();
  }

  //If line is empty
  if (text === "" || text === "\r" || text === "\r\n" || text == "") {
    //If the line was an identend comment, it will leave an empty line
    if (CommentIndex > 0) {
      diagnoser.Add(line.offset, "A line cannot have an identented comment", DiagnosticSeverity.error, "minecraft.language.identation");
    }

    return;
  }

  //Find end of key
  const Index = text.indexOf("=");

  //If no key definition has been found, it means an invalid line has been given
  if (Index < 0) {
    diagnoser.Add(line.offset, "A translation item needs a '=' to seperate key and value", DiagnosticSeverity.error, "minecraft.language.seperator");
  } else {
    const Key = text.substring(0, Index);
    const KeyIndex = keys.findIndex((item) => item.text == Key);

    //If the key is found in the existing list of keys, then produce an error
    if (KeyIndex >= 0) {
      const secondKey = keys[KeyIndex];

      diagnoser.Add(line.offset, "Duplicate key found", DiagnosticSeverity.error, "minecraft.language.duplicate");
      diagnoser.Add(secondKey.offset, "Duplicate key found", DiagnosticSeverity.error, "minecraft.language.duplicate");
    }

    keys.push(OffsetWord.create(text, line.offset));
  }

  //The value needs to be something
  if (Index >= text.length) {
    diagnoser.Add(line.offset, "A value must be atleast length of 1 or more", DiagnosticSeverity.error, "minecraft.language.value");
  }
}