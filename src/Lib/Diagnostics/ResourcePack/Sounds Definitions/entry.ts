import { Internal, SMap, TextDocument } from "bc-minecraft-bedrock-project";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { DiagnosticSeverity } from "../../../../main";
import { DiagnosticsBuilder } from "../../../Types";
import { education_enabled } from "../../Definitions";
import { Json } from "../../Json/Json";

/**Diagnoses the given document as a `sound_definitions` file
 * @param doc The text document to diagnose
 * @param diagnoser The diagnoser builder to receive the errors*/
export function Diagnose(doc: TextDocument, diagnoser: DiagnosticsBuilder): void {
  const defintions = Json.LoadReport<Internal.ResourcePack.SoundDefinitions>(doc, diagnoser);
  if (!Internal.ResourcePack.SoundDefinitions.is(defintions)) return;

  //Get pack for files search
  const pack = diagnoser.context.getCache().ResourcePacks.get(doc.uri);
  if (pack === undefined) return;

  const sounds = defintions.sound_definitions;
  const sound_files = diagnoser.context
    .getFiles(pack.folder, ["**/sounds/**/*.{fsb,wav,ogg}"], pack.context.ignores)
    .map((item) => item.replace(/\\/gi, "/"));

  //For each sound definition
  SMap.forEach(sounds, (sound, sound_id) => {
    //The counter for how many loads have been specified
    let loads = 0;

    //For each file reference
    sound.sounds.forEach((soundSpec) => {
      if (typeof soundSpec === "string") {
        sound_files_diagnose(sound_id, soundSpec, sound_files, diagnoser);
      } else {
        const name = soundSpec.name;
        if (typeof name === "string") {
          sound_files_diagnose(sound_id, name, sound_files, diagnoser);
        }

        //Count the amount of sounds that specified to load on low memory not
        if (soundSpec.load_on_low_memory !== undefined) {
          loads++;
        }
      }
    });

    if (sound.sounds.length > 2 && loads <= 1) {
      diagnoser.Add(
        sound_id,
        "It is best, when using multiple sound, to mark one of them with `load_on_low_memory': true, and the others to false, this will reduce the amount of memory needed for lower tier devices",
        DiagnosticSeverity.info,
        "resourcepack.sound.load_on_low_memory"
      );
    }
  });
}

export function sound_files_diagnose(
  owner: string,
  file: string,
  files: string[],
  diagnoser: DiagnosticsBuilder
): void {
  for (let I = 0; I < files.length; I++) {
    if (files[I].includes(file)) {
      //Found then return out
      return;
    }
  }

  if (MinecraftData.ResourcePack.hasSound(file, education_enabled(diagnoser))) return;

  diagnoser.Add(
    `${owner}/${file}`,
    `Cannot find sound file: ${file}`,
    DiagnosticSeverity.error,
    "resourcepack.sound.missing"
  );
}
