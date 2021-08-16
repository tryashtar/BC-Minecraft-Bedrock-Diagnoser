import { Command } from "bc-minecraft-bedrock-command";
import { Modes } from "bc-minecraft-bedrock-types";
import { ModeHandler } from "bc-minecraft-bedrock-types/lib/src/Modes/ModeHandler";
import { DiagnosticsBuilder } from "../../Types/DiagnosticsBuilder/DiagnosticsBuilder";
import { DiagnosticSeverity } from "../../Types/DiagnosticsBuilder/Severity";
import { OffsetWord } from "../../Types/OffsetWord";

/**Diagnoses the value as a value in the mode: camerashake
 * @param value The value to evualate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to*/
export function mode_camerashake_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  mode_generic_diagnose(value, Modes.CameraShake, diagnoser);
}

/**Diagnoses the value as a value in the mode: clone
 * @param value The value to evualate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to*/
export function mode_clone_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  mode_generic_diagnose(value, Modes.Clone, diagnoser);
}

/**Diagnoses the value as a value in the mode: difficulty
 * @param value The value to evualate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to*/
export function mode_difficulty_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  mode_generic_diagnose(value, Modes.Difficulty, diagnoser);
}

/**Diagnoses the value as a value in the mode: fill
 * @param value The value to evualate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to*/
export function mode_fill_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  mode_generic_diagnose(value, Modes.Fill, diagnoser);
}

/**Diagnoses the value as a value in the mode: gamemode
 * @param value The value to evualate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to*/
export function mode_gamemode_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  mode_generic_diagnose(value, Modes.Gamemode, diagnoser);
}

/**Diagnoses the value as a value in the mode: locatefeature
 * @param value The value to evualate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to*/
export function mode_locatefeature_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  mode_generic_diagnose(value, Modes.LocateFeature, diagnoser);
}

/**Diagnoses the value as a value in the mode: mask
 * @param value The value to evualate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to*/
export function mode_mask_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  mode_generic_diagnose(value, Modes.Mask, diagnoser);
}

/**Diagnoses the value as a value in the mode: mirror
 * @param value The value to evualate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to*/
export function mode_mirror_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  mode_generic_diagnose(value, Modes.Mirror, diagnoser);
}

/**Diagnoses the value as a value in the mode: musicrepeat
 * @param value The value to evualate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to*/
export function mode_musicrepeat_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  mode_generic_diagnose(value, Modes.MusicRepeat, diagnoser);
}

/**Diagnoses the value as a value in the mode: oldblock
 * @param value The value to evualate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to*/
export function mode_oldblock_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  mode_generic_diagnose(value, Modes.OldBlock, diagnoser);
}

/**Diagnoses the value as a value in the mode: operation
 * @param value The value to evualate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to*/
export function mode_operation_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  mode_generic_diagnose(value, Modes.Operation, diagnoser);
}

/**Diagnoses the value as a value in the mode: replace
 * @param value The value to evualate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to*/
export function mode_replace_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  mode_generic_diagnose(value, Modes.Replace, diagnoser);
}

/**Diagnoses the value as a value in the mode: ridefill
 * @param value The value to evualate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to*/
export function mode_ridefill_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  mode_generic_diagnose(value, Modes.RideFill, diagnoser);
}

/**Diagnoses the value as a value in the mode: riderules
 * @param value The value to evualate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to*/
export function mode_riderules_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  mode_generic_diagnose(value, Modes.RideRules, diagnoser);
}

/**Diagnoses the value as a value in the mode: rotation
 * @param value The value to evualate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to*/
export function mode_rotation_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  mode_generic_diagnose(value, Modes.Rotation, diagnoser);
}

/**Diagnoses the value as a value in the mode: save
 * @param value The value to evualate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to*/
export function mode_save_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  mode_generic_diagnose(value, Modes.Save, diagnoser);
}

/**Diagnoses the value as a value in the mode: selectorattribute
 * @param value The value to evualate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to*/
export function mode_selectorattribute_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  mode_generic_diagnose(value, Modes.SelectorAttribute, diagnoser);
}

/**Diagnoses the value as a value in the mode: selectortype
 * @param value The value to evualate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to*/
export function mode_selectortype_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  mode_generic_diagnose(value, Modes.SelectorType, diagnoser);
}

/**Diagnoses the value as a value in the mode: slottype
 * @param value The value to evualate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to*/
export function mode_slottype_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  mode_generic_diagnose(value, Modes.SlotType, diagnoser);
}

/**Diagnoses the value as a value in the mode: slotid
 * @param value The value to evualate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to*/
export function mode_slotid_diagnose(value: OffsetWord, Com: Command, diagnoser: DiagnosticsBuilder): void {
  //TODO add data to bedrock types
}

/**Diagnoses the value as a value in the mode: structureanimation
 * @param value The value to evualate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to*/
export function mode_structureanimation_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  mode_generic_diagnose(value, Modes.StructureAnimation, diagnoser);
}

/**Diagnoses the value as a value in the mode: teleportrules
 * @param value The value to evualate, needs the offset to report bugs
 * @param diagnoser The diagnoser to report to*/
export function mode_teleportrules_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  mode_generic_diagnose(value, Modes.TeleportRules, diagnoser);
}

function mode_generic_diagnose(value: OffsetWord, Mode: ModeHandler, diagnoser: DiagnosticsBuilder): void {
  const m = Mode.get(value.text);

  //Mode returned then it is valid
  if (m) return;

  diagnoser.Add(value.offset, `value: '${value.text}' is not defined in mode: '${Mode.name}'`, DiagnosticSeverity.error, `mode.${Mode.name}.missing`);
}
