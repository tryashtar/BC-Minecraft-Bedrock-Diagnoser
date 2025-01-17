import { TextDocument } from "bc-minecraft-bedrock-project/lib/src/Lib/Types/TextDocument";
import { ResourcePackCollection } from "bc-minecraft-bedrock-project/lib/src/Lib/Project/ResourcePack/ResourcePackCollection";
import { DiagnosticsBuilder } from "../../../Types";
import { DiagnosticSeverity } from "../../../Types/Severity";
import { Json } from "../../Json/Json";

/**Diagnoses the given document as a block
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function Diagnose(doc: TextDocument, diagnoser: DiagnosticsBuilder): void {
  const blocks = Json.LoadReport<Blocks>(doc, diagnoser);

  if (!Json.TypeCheck(blocks, diagnoser, "blocks.json", "minecraft.resourcepack.blocks.invalid", is)) return;

  const keys = Object.keys(blocks);
  const rp = diagnoser.context.getCache().ResourcePacks;

  for (let I = 0; I < keys.length; I++) {
    const key = keys[I];
    if (key === "format_version") continue;

    const block = blocks[keys[I]];

    if (typeof block === "object") {
      const texture = block.textures;

      if (typeof texture === "string") {
        hasDefinition(key, texture, rp, diagnoser);
      } else if (texture) {
        if (texture.down) hasDefinition(key, texture.down, rp, diagnoser);
        if (texture.up) hasDefinition(key, texture.up, rp, diagnoser);
        if (texture.side) hasDefinition(key, texture.side, rp, diagnoser);

        if (texture.north) hasDefinition(key, texture.north, rp, diagnoser);
        if (texture.south) hasDefinition(key, texture.south, rp, diagnoser);
        if (texture.west) hasDefinition(key, texture.west, rp, diagnoser);
        if (texture.east) hasDefinition(key, texture.east, rp, diagnoser);
      }
    }
  }
}

function hasDefinition(block: string, value: string, rp: ResourcePackCollection, diagnoser: DiagnosticsBuilder): void {
  if (rp.textures.has(value)) return;

  diagnoser.Add(
    `${block}/${value}`,
    "The texture is not defined in the terrain_texture.json",
    DiagnosticSeverity.error,
    "resourcepack.texture.undefined"
  );
}

interface Blocks {
  [block_id: string]: {
    sound?: string;
    textures:
      | string
      | {
          down?: string;
          up?: string;
          side?: string;
          east?: string;
          north?: string;
          south?: string;
          west?: string;
        };
  };
}

function is(value: any): value is Blocks {
  if (typeof value === "object") {
    return true;
  }

  return false;
}
