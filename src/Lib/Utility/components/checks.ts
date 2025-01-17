import { ComponentBehavior, ComponentContainer } from "bc-minecraft-bedrock-types/lib/src/Minecraft/Components";
import { DiagnosticsBuilder, DiagnosticSeverity } from "../../Types";
import { Context } from "./components";

export type ComponentCheck = (name: string, component: any, context: Context, diagnoser: DiagnosticsBuilder) => void;

export function component_error(message: string, code: string | number): ComponentCheck {
  return (name, component, context, diagnoser) => {
    diagnoser.Add(name, message, DiagnosticSeverity.error, code);
  };
}

export function component_warning(message: string, code: string | number): ComponentCheck {
  return (name, component, context, diagnoser) => {
    diagnoser.Add(name, message, DiagnosticSeverity.warning, code);
  };
}

export function components_check(
  data: ComponentBehavior | undefined,
  context: Context,
  diagnoser: DiagnosticsBuilder,
  component_test: Record<string, ComponentCheck>
): void {
  if (data === undefined) return;

  compContainerCheck(data.components, context, diagnoser, component_test);

  if (data.component_groups) {
    Object.entries(data.component_groups).forEach(([key, group]) => {
      compContainerCheck(group, context, diagnoser, component_test);
    });
  }
}

function compContainerCheck(
  container: ComponentContainer | undefined,
  context: Context,
  diagnoser: DiagnosticsBuilder,
  component_test: Record<string, ComponentCheck>
): void {
  if (container === undefined) return;

  const keys = Object.getOwnPropertyNames(container);

  keys.forEach((key) => {
    const callbackfn = component_test[key];

    if (callbackfn) {
      callbackfn(key, container[key], context, diagnoser);
    }
  });
}
