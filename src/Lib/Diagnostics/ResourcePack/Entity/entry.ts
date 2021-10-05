import { Internal, ResourcePack, TextDocument } from "bc-minecraft-bedrock-project";
import { DiagnosticsBuilder } from "../../../Types/DiagnosticsBuilder/DiagnosticsBuilder";
import { Json } from "../../Json/Json";
import { animation_controller_diagnose_implementation } from "../Animation Controllers/diagnostics";
import { animation_or_controller_diagnose_implementation } from "../anim or controller";
import { MolangFullSet } from "bc-minecraft-molang";
import { Types } from "bc-minecraft-bedrock-types";
import { diagnose_molang } from "../../Molang/diagnostics";
import { render_controller_diagnose_implementation } from "../Render Controller/diagnostics";
import { resourcepack_has_model } from "../Model/diagnose";
import { texture_files_diagnose } from "../Texture Atlas/entry";
import { sound_files_diagnose } from "../Sounds Definitions/entry";
import { resourcepack_particle_diagnose } from "../Particle/diagnose";

/**Diagnoses the given document as an RP entity
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function Diagnose(doc: TextDocument, diagnoser: DiagnosticsBuilder): void {
  //No behaviorpack check, entities can exist without their bp side (for servers)

  //Check molang math functions
  diagnose_molang(doc.getText(), "entity", diagnoser);

  //Load entity
  const entity = Json.LoadReport<Internal.ResourcePack.Entity>(doc, diagnoser);
  if (!Internal.ResourcePack.Entity.is(entity)) return;

  const container = entity["minecraft:client_entity"].description;
  const entityGathered = ResourcePack.Entity.Process(doc);

  if (!entityGathered) return;
  if (!entityGathered.molang) entityGathered.molang = MolangFullSet.harvest(doc.getText());

  //Check animations / animation controllers
  Types.Definition.forEach(container.animations, (reference, anim_id) =>
    animation_or_controller_diagnose_implementation(anim_id, entityGathered, "entity", diagnoser)
  );

  //Check animation controllers
  container.animation_controllers?.forEach((controller) => {
    const temp = flatten(controller);
    if (temp) animation_controller_diagnose_implementation(temp, entityGathered, "entity", diagnoser);
  });

  //Check render controllers
  container.render_controllers?.forEach((controller) => {
    const temp = getkey(controller);
    if (temp) render_controller_diagnose_implementation(temp, entityGathered, "entity", diagnoser);
  });

  //Check models
  Types.Definition.forEach(container.geometry, (ref, modelid) => resourcepack_has_model(modelid, entityGathered.id, diagnoser));

  //check particles
  Types.Definition.forEach(container.particle_effects, (ref, part_id) => resourcepack_particle_diagnose(part_id, diagnoser));

  //Get pack
  const pack = diagnoser.context.getCache().ResourcePacks.get(doc.uri);
  if (pack === undefined) return;

  const rp_files = diagnoser.context
    .getFiles(pack.folder, ["**/textures/**/*.{tga,png,jpg,jpeg}", "**/sounds/**/*.{fsb,wav,ogg}"], pack.context.ignores)
    .map((item) => item.replace(/\\/gi, "/"));

  //Check if entity has textures defined
  Types.Definition.forEach(container.textures, (ref, id) => {
    texture_files_diagnose(container.identifier, id, rp_files, diagnoser);
  });
  //Check if entity has sounds defined
  Types.Definition.forEach(container.sound_effects, (ref, id) => {
    sound_files_diagnose(container.identifier, id, rp_files, diagnoser);
  });
}

function flatten(data: string | Types.Definition): string | undefined {
  if (typeof data === "string") return data;

  const key = Object.getOwnPropertyNames(data)[0];

  if (key) return data[key];

  return undefined;
}

function getkey(data: string | Types.Definition): string | undefined {
  if (typeof data === "string") return data;

  return Object.getOwnPropertyNames(data)[0];
}
