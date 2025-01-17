import { General } from "bc-minecraft-bedrock-types";
import { DiagnosticsBuilder } from "../../Types/DiagnosticsBuilder";
import { DiagnosticSeverity } from "../../Types/Severity";
import { Types } from "bc-minecraft-bedrock-types";

export function general_integer_diagnose(
  value: Types.OffsetWord,
  diagnoser: DiagnosticsBuilder,
  range?: { min: number; max: number }
): boolean {
  if (General.Integer.is(value.text)) {
    if (range) {
      const v = Number.parseInt(value.text);

      if (v < range.min)
        diagnoser.Add(
          value,
          `The value of ${v} is lower than the allowed minimum: ${range.min}`,
          DiagnosticSeverity.error,
          "general.integer.minimum"
        );
      if (v > range.max)
        diagnoser.Add(
          value,
          `The value of ${v} is higher than the allowed minimum: ${range.max}`,
          DiagnosticSeverity.error,
          "general.integer.maximum"
        );
    }

    return true;
  }

  diagnoser.Add(value, "Invalid integer value: " + value.text, DiagnosticSeverity.error, "general.integer.invalid");
  return false;
}

export function general_positive_integer_diagnose(value: Types.OffsetWord, diagnoser: DiagnosticsBuilder): boolean {
  //If its not a integer then skip positive check
  if (!general_integer_diagnose(value, diagnoser)) return false;

  const n = Number.parseInt(value.text);

  if (n >= 0) return true;

  diagnoser.Add(
    value,
    `expected a positive integer but got: ${n}`,
    DiagnosticSeverity.error,
    "general.integer.positive.only"
  );
  return false;
}
