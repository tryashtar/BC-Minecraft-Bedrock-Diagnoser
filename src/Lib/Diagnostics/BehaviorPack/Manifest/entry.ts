import { Internal, TextDocument } from "bc-minecraft-bedrock-project";
import { DiagnosticsBuilder } from "../../../Types";
import { Json } from "../../Json/Json";
import { minecraft_manifest_diagnose, minecraft_manifest_required_module } from "../../Minecraft/Manifest";
import { Types } from "bc-minecraft-bedrock-types";
import { DiagnosticSeverity } from "../../../../main";
import { Manifest } from "bc-minecraft-bedrock-project/lib/src/Lib/Internal/Types";

/**Diagnoses the given document as an bp manifest
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function Diagnose(doc: TextDocument, diagnoser: DiagnosticsBuilder): void {
  const manifest = Json.LoadReport<Manifest>(doc, diagnoser);

  if (!Json.TypeCheck(manifest, diagnoser, "manifest", "minecraft.manifest.invalid", Manifest.is)) return;

  minecraft_manifest_diagnose(manifest, diagnoser);
  minecraft_manifest_required_module(manifest, diagnoser, "data", "javascript", "script");

  //BP specific
  check_min_engine_version(manifest.header.min_engine_version, doc, diagnoser);
}

function check_min_engine_version(
  version: number[] | string | Types.Version | undefined,
  doc: TextDocument,
  diagnoser: DiagnosticsBuilder
): void {
  const pack = diagnoser.context.getCache().BehaviorPacks.get(doc);

  /**No pack then skip */
  if (pack === undefined) return;

  /**Only need to check if there are functions */
  if (pack.functions.count() === 0) return;

  if (version !== undefined) {
    if (Types.Version.compare(version, { major: 1, minor: 8, patch: 0 }) >= 0) return;
  }

  return diagnoser.Add(
    "header",
    "Behaviorpacks with mcfunctions need `min_engine_version` of atleast value: '1.8.0'",
    DiagnosticSeverity.error,
    "behaviorpack.manifest.min_engine_version"
  );
}
