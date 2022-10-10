import { Internal, SMap } from "bc-minecraft-bedrock-project";
import { ComponentGroups } from "bc-minecraft-bedrock-types/lib/src/Minecraft/Components";
import { DiagnosticsBuilder, DiagnosticSeverity } from "../../../../main";
import { behaviorpack_entity_components_filters } from "./components/filters";

type EntityEvent = Internal.BehaviorPack.EntityEvent;

export function behaviorpack_entity_check_events(
  events: SMap<EntityEvent> | EntityEvent[],
  diagnoser: DiagnosticsBuilder,
  component_groups?: SMap<Internal.BehaviorPack.EntityComponentContainer>
) {
  if (Array.isArray(events)) {
    events.forEach((event) => behaviorpack_entity_check_event(event, "", diagnoser, component_groups));
  } else {
    SMap.forEach(events, (event, key) => behaviorpack_entity_check_event(event, key, diagnoser, component_groups));
  }
}

/**
 *
 * @param event
 * @param diagnoser
 * @param component_groups
 */
export function behaviorpack_entity_check_event(
  event: EntityEvent & { filters?: any },
  event_id: string,
  diagnoser: DiagnosticsBuilder,
  component_groups?: ComponentGroups
): void {
  has_groups(diagnoser, event_id, event.add?.component_groups, component_groups);
  has_groups(diagnoser, event_id, event.remove?.component_groups, component_groups);

  event.randomize?.forEach((item) => {
    behaviorpack_entity_check_event(item, event_id, diagnoser, component_groups);
  });

  event.sequence?.forEach((item) => {
    behaviorpack_entity_check_event(item, event_id, diagnoser, component_groups);
  });

  behaviorpack_entity_components_filters(event, diagnoser);
}

function has_groups(
  diagnoser: DiagnosticsBuilder,
  id: string,
  groups?: string[],
  component_groups?: SMap<Internal.BehaviorPack.EntityComponentContainer>
): void {
  if (groups === undefined) return;

  for (let I = 0; I < groups.length; I++) {
    const group = groups[I];

    if (component_groups) {
      //If there is an item, continue
      if (component_groups[group] !== undefined) continue;
    }

    diagnoser.Add(
      `events/${id}/${group}`,
      `Event is calling component group: ${group}, but the component group was not found`,
      DiagnosticSeverity.warning,
      "behaviorpack.entity.component_group.missing"
    );
  }
}
