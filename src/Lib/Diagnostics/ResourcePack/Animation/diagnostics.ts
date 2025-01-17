import { Definition } from "bc-minecraft-bedrock-types/lib/src/Types/Definition";
import { DiagnosticsBuilder } from "../../../Types";
import { DiagnosticSeverity } from "../../../Types/Severity";
import { education_enabled } from "../../Definitions";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { EntityAnimationMolangCarrier } from "../../../Types";
import { MolangDataSetKey } from "bc-minecraft-molang";
import { diagnose_molang_implementation } from "../../Molang";

/**
 *
 * @param id
 * @param data
 * @param diagnoser
 */
export function animation_diagnose_implementation(
  anim_id: string,
  user: EntityAnimationMolangCarrier,
  ownerType: MolangDataSetKey,
  diagnoser: DiagnosticsBuilder,
  particles?: Definition,
  sounds?: Definition
): void {
  if (!has_animation(anim_id, diagnoser)) return;
  //Project has animation
  const anim = diagnoser.context.getCache().ResourcePacks.animations.get(anim_id);

  if (!anim) return;

  diagnose_molang_implementation(anim, user, ownerType, diagnoser);

  //Particle check
  anim.particles.using.forEach((particle) => {
    if (particles && particles[particle] !== undefined) return;

    diagnoser.Add(
      `animations/${anim_id}`,
      `Animation: ${anim_id} uses particle: '${particle}', but no definition has been found`,
      DiagnosticSeverity.warning,
      "resourcepack.particle.missing"
    );
  });

  //Sound check
  anim.sounds.using.forEach((sound) => {
    if (sounds && sounds[sound] !== undefined) return;

    diagnoser.Add(
      `animations/${anim_id}`,
      `Animation: ${anim_id} uses sound: '${sound}', but no definition has been found`,
      DiagnosticSeverity.warning,
      "resourcepack.sound.missing"
    );
  });
}

/**
 *
 * @param id
 * @param diagnoser
 * @returns
 */
export function has_animation(id: string, diagnoser: DiagnosticsBuilder): boolean {
  const cache = diagnoser.context.getCache();

  //Project has render controller
  if (cache.ResourcePacks.animations.has(id)) return true;

  const edu = education_enabled(diagnoser);

  //Vanilla has render controller
  if (MinecraftData.ResourcePack.hasAnimation(id, edu)) return true;

  //Nothing then report error
  diagnoser.Add(
    `"${id}"`,
    `Cannot find resourcepack animation: ${id}`,
    DiagnosticSeverity.error,
    "resourcepack.animation.missing"
  );
  return false;
}
