import {
  EntityEnumProperty,
  EntityFloatProperty,
  EntityIntProperty,
  EntityProperty,
} from "bc-minecraft-bedrock-project/lib/src/Lib/Project/BehaviorPack/Entity";
import { DiagnosticSeverity, DiagnosticsBuilder } from "../../../Types";

export function diagnose_entity_properties_definition(property: EntityProperty[], diagnoser: DiagnosticsBuilder) {
  for (const prop of property) {
    diagnose_entity_property_definition(prop, diagnoser);
  }

  // https://learn.microsoft.com/en-us/minecraft/creator/documents/introductiontoentityproperties#number-of-entity-properties-per-entity-type
  if (property.length > 32) {
    diagnoser.Add(
      `properties`,
      `Entity has too many properties: ${property.length}, expected 32 or less`,
      DiagnosticSeverity.warning,
      "behaviorpack.entity.property.count"
    );
  }
}

function diagnose_entity_property_definition(property: EntityProperty, diagnoser: DiagnosticsBuilder) {
  const { name, type } = property;
  switch (type) {
    case "bool":
      return diagnose_entity_bool_property_definition(property, diagnoser);
    case "float":
      return diagnose_entity_float_property_definition(property, diagnoser);
    case "int":
      return diagnose_entity_int_property_definition(property, diagnoser);
    case "enum":
      return diagnose_entity_enum_property_definition(property, diagnoser);
  }

  diagnoser.Add(
    `properties/${name}`,
    `Unknown property type: ${type}`,
    DiagnosticSeverity.error,
    "behaviorpack.entity.property.unknown"
  );
}

function diagnose_entity_bool_property_definition(property: EntityProperty, diagnoser: DiagnosticsBuilder) {
  const { name, default: def } = property;

  if (typeof def === "boolean" || typeof def === "string") return;

  diagnoser.Add(
    `properties/${name}/${def}`,
    `Default value is not a boolean: ${def}`,
    DiagnosticSeverity.error,
    "behaviorpack.entity.property.bool.default"
  );
}

function diagnose_entity_float_property_definition(property: EntityFloatProperty, diagnoser: DiagnosticsBuilder) {
  const { name, default: def } = property;

  // Default value needs to be a number and within the range
  if (def === undefined) return;

  if (Array.isArray(property.range) && typeof def === "number") {
    if (def < property.range[0] || def > property.range[1]) {
      diagnoser.Add(
        `properties/${name}/${def}`,
        `Default value is not within the range: ${def}`,
        DiagnosticSeverity.error,
        "behaviorpack.entity.property.float.default"
      );
    }
  }

  if (typeof def === "number" || typeof def === "string") return;

  diagnoser.Add(
    `properties/${name}/${def}`,
    `Default value is not a boolean: ${def}`,
    DiagnosticSeverity.error,
    "behaviorpack.entity.property.float.default"
  );
}

function diagnose_entity_int_property_definition(property: EntityIntProperty, diagnoser: DiagnosticsBuilder) {
  const { name, default: def } = property;

  // Default value needs to be a number and within the range
  if (def === undefined) return;

  // Default value needs to be a number and within the range
  if (Array.isArray(property.range) && typeof def === "number") {
    if (def < property.range[0] || def > property.range[1]) {
      diagnoser.Add(
        `properties/${name}/${def}`,
        `Default value is not within the range: ${def}`,
        DiagnosticSeverity.error,
        "behaviorpack.entity.property.int.default"
      );
    }
  }

  if (typeof def === "number" || typeof def === "string") return;

  diagnoser.Add(
    `properties/${name}/${def}`,
    `Default value is not a boolean: ${def}`,
    DiagnosticSeverity.error,
    "behaviorpack.entity.property.int.default"
  );
}

function diagnose_entity_enum_property_definition(
  property: Partial<EntityEnumProperty>,
  diagnoser: DiagnosticsBuilder
) {
  const { name, default: def } = property;
  //https://learn.microsoft.com/en-us/minecraft/creator/documents/introductiontoentityproperties#enum-property-restrictions

  // default needs to be in the list
  if (def !== undefined) {
    if (property.values?.indexOf(def) === -1) {
      diagnoser.Add(
        `properties/${name}/${def}`,
        `Default value is not in the list of values: ${def}`,
        DiagnosticSeverity.error,
        "behaviorpack.entity.property.enum.default"
      );
    }
  }

  if (property.values !== undefined) {
    // Maximum 16 entries
    if (property.values.length > 16) {
      diagnoser.Add(
        `properties/${name}`,
        `Entity has too many values: ${property.values?.length}, expected 16 or less`,
        DiagnosticSeverity.error,
        "behaviorpack.entity.property.enum.values.count"
      );
    }

    // Each entry needs to be a string of length 1 to 32
    for (const value of property.values) {
      if (typeof value !== "string") {
        diagnoser.Add(
          `properties/${name}/${value}`,
          `Value is not a string: ${value}`,
          DiagnosticSeverity.error,
          "behaviorpack.entity.property.enum.values.type"
        );
      } else {
        if (value.length > 32 || value.length < 1) {
          diagnoser.Add(
            `properties/${name}/${value}`,
            `Value is not a string of length 1 to 32: ${value}`,
            DiagnosticSeverity.error,
            "behaviorpack.entity.property.enum.values.length"
          );
        }
      }
    }
  }
}

export function diagnose_entity_property_usage(
  definitions: EntityProperty[],
  name: string,
  value: string | number | boolean,
  parent: "events" | "filter",
  diagnoser: DiagnosticsBuilder
): void {
  for (const def of definitions) {
    if (def.name === name) {
      check_entity_property_usage(def, name, value, parent, diagnoser);
    }
  }
}

function check_entity_property_usage(
  definition: EntityProperty,
  name: string,
  value: string | number | boolean,
  parent: "events" | "filter",
  diagnoser: DiagnosticsBuilder
): void {
  switch (definition.type) {
    case "bool":
      value = value ?? false;
      if (typeof value === "boolean" || typeof value === "string") return;

      diagnoser.Add(
        `${parent}/${name}/${value}`,
        `Value is not a boolean: ${value}`,
        DiagnosticSeverity.error,
        "behaviorpack.entity.property.bool.value"
      );
      break;

    case "int":
    case "float":
      if (typeof value === "number" || typeof value === "string") return;

      diagnoser.Add(
        `${parent}/${name}/${value}`,
        `Value is not a number: ${value}`,
        DiagnosticSeverity.error,
        `behaviorpack.entity.property.${definition.type}.value`
      );
      break;

    case "enum":
      if (typeof value !== "string") {
        diagnoser.Add(
          `${parent}/${name}/${value}`,
          `Value is not a string: ${value}`,
          DiagnosticSeverity.error,
          "behaviorpack.entity.property.enum.value"
        );
        break;
      }

      // Value needs to be in the list
      if (definition.values?.indexOf(value) === -1) {
        diagnoser.Add(
          `${parent}/${name}/${value}`,
          `Value is not in the list of values: ${value}`,
          DiagnosticSeverity.error,
          "behaviorpack.entity.property.enum.value"
        );
      }
      break;
  }
}
