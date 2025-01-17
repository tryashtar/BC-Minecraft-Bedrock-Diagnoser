import { ProjectData, TextDocument } from "bc-minecraft-bedrock-project";
import { mcfunction_commandsCheck } from "../../../../../../src/Lib/Diagnostics/BehaviorPack/Mcfunction";
import { TestDiagnoser } from "../../../../../diagnoser";

describe("BehaviorPack", () => {
  describe("Mcfunctions", () => {
    describe("Commands", () => {
      var diagnoser: TestDiagnoser;
      var data: ProjectData;

      beforeEach(() => {
        diagnoser = TestDiagnoser.Create();
        data = diagnoser.context.getCache();
      });

      //Correct commands
      const correctsCommands: string[] = [
        'setblock ~ ~ ~ spruce_log ["pillar_axis":"x"]',
        "setblock ~ ~ ~ spruce_log []",
      ];

      //Incorrect commands
      const incorrectCommands: string[] = [
        "setblock ~ ~ ~ spruce_log [pillar_axis:x]",
        "setblock ~ ~ ~ stone [pillar_axis:x]",
      ];

      for (let I = 0; I < correctsCommands.length; I++) {
        const command = correctsCommands[I];

        it(`correct ${command}`, () => {
          const doc: TextDocument = {
            uri: "fake",
            getText(range) {
              return command;
            },
          };

          mcfunction_commandsCheck(doc, diagnoser);
          diagnoser.expectEmpty();
        });
      }

      for (let I = 0; I < incorrectCommands.length; I++) {
        const command = incorrectCommands[I];

        it(`incorrect ${command}`, () => {
          const doc: TextDocument = {
            uri: "fake",
            getText(range) {
              return command;
            },
          };

          mcfunction_commandsCheck(doc, diagnoser);
          diagnoser.expectAny();
        });
      }
    });
  });
});
