import { TextDocument } from "bc-minecraft-bedrock-project";
import { DiagnosticsBuilder } from "../../Types/DiagnosticsBuilder";

import * as Manifest from "./Manifest/entry";

/** The namespace that deals with worldpack diagnostics */
export namespace WorldPack {
  /**Processes and diagnoses the given textdocument
   * @param doc The document to process / diagnose
   * @param diagnoser The diagnoser to report to
   * @returns `true` or `false` whenever or not it was succesfull*/
  export function Process(doc: TextDocument, diagnoser: DiagnosticsBuilder): boolean {
    //retrieve filter doc type
    if (doc.uri.endsWith("manifest.json")) {
      Manifest.Diagnose(doc, diagnoser);
      return true;
    }

    return true;
  }
}
