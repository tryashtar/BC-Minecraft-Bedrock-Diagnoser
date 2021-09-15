import { DiagnosticsBuilder, DiagnosticsBuilderContent } from "../src/Lib/Types/DiagnosticsBuilder/DiagnosticsBuilder";
import { DiagnosticSeverity } from "../src/Lib/Types/DiagnosticsBuilder/Severity";
import { ProjectData } from "bc-minecraft-bedrock-project";
import { Types } from "bc-minecraft-bedrock-types";
import { MCIgnore, MCProject } from "bc-minecraft-project";
import { expect } from "chai";
import { DiagnoserContext } from "../src/main";

export interface Error {
  position: Types.DocumentLocation;
  message: string;
  severity: DiagnosticSeverity;
  code: string | number;
}

export class TestDiagnoser implements DiagnosticsBuilder {
  public items: Error[];

  public context: DiagnosticsBuilderContent;
  public project: MCProject;

  constructor(context: DiagnosticsBuilderContent | undefined = undefined, project: MCProject | undefined = undefined) {
    this.context = context ?? TestDiagnoser.emptyContext();
    this.project = project ?? MCProject.createEmpty();
    this.items = [];
  }

  /**
   *
   * @param position
   * @param message
   * @param severity
   * @param code
   */
  Add(position: Types.DocumentLocation, message: string, severity: DiagnosticSeverity, code: string | number): void {
    this.items.push({
      code: code,
      message: message,
      position: position,
      severity: severity,
    });
  }

  /**
   *
   */
  expectEmpty(): void {
    expect(this.items.length).to.lessThanOrEqual(0, `Expected no errors/warnings, but has received ${this.items.length}: ${JSON.stringify(this.items)}`);
  }

  /**
   *
   * @param number
   */
  expectAmount(number: number): void {
    expect(this.items.length).to.equal(number, `Expected ${number} errors/warnings, but has received ${this.items.length}: ${JSON.stringify(this.items)}`);
  }

  /**
   *
   * @param number
   */
  expectGreaterThan(number: number): void {
    expect(this.items.length).to.greaterThan(number, `Expected more ${number} errors/warnings, but has received ${this.items.length}: ${JSON.stringify(this.items)}`);
  }

  /**
   *
   * @param number
   */
  expectGreaterThanOrEqual(number: number): void {
    expect(this.items.length).to.greaterThanOrEqual(
      number,
      `Expected more or equal ${number} errors/warnings, but has received ${this.items.length}: ${JSON.stringify(this.items)}`
    );
  }

  /**Gets the first matching message
   * @param message
   * @returns*/
  getMessage(message: string): Error | undefined {
    for (let I = 0; I < this.items.length; I++) {
      const elem = this.items[I];

      if (elem.message === message) return elem;
    }

    return undefined;
  }

  /**Gets the first matching position
   * @param message
   * @returns*/
  getPosition(position: Types.DocumentLocation): Error | undefined {
    for (let I = 0; I < this.items.length; I++) {
      const elem = this.items[I];

      if (elem.position === position) return elem;
    }

    return undefined;
  }

  /**Gets the first matching severity
   * @param message
   * @returns*/
  getSeverity(severity: DiagnosticSeverity): Error | undefined {
    for (let I = 0; I < this.items.length; I++) {
      const elem = this.items[I];

      if (elem.severity === severity) return elem;
    }

    return undefined;
  }

  /**Gets the first matching code
   * @param message
   * @returns*/
  getCode(code: string | number): Error | undefined {
    for (let I = 0; I < this.items.length; I++) {
      const elem = this.items[I];

      if (elem.code === code) return elem;
    }

    return undefined;
  }

  /**Checks if the message is inside the internal list
   * @param message
   * @returns
   */
  hasMessage(message: string): boolean {
    return this.getMessage(message) !== undefined;
  }

  /**Checks if the position is inside the internal list
   * @param position
   * @returns
   */
  hasPosition(position: Types.DocumentLocation): boolean {
    return this.getPosition(position) !== undefined;
  }

  /**Checks if the severity is inside the internal list
   * @param message
   * @returns
   */
  hasSeverity(severity: DiagnosticSeverity): boolean {
    return this.getSeverity(severity) !== undefined;
  }

  /**Checks if the code is inside the internal list
   * @param message
   * @returns
   */
  hasCode(code: string | number): boolean {
    return this.getCode(code) !== undefined;
  }
}

export namespace TestDiagnoser {
  export function createFromProjectData(data: ProjectData): TestDiagnoser {
    var context = emptyContext();

    context.getCache = () => data;

    return new TestDiagnoser(context, undefined);
  }

  export function emptyContext(): DiagnosticsBuilderContent {
    return {
      getCache: () => {
        return new ProjectData({ getDocument: (uri) => undefined, getFiles: (folder, ignores) => [] });
      },
      getDocument: (uri: string) => {
        return undefined;
      },
      getFiles: (folder: string, ignores: MCIgnore) => {
        return [];
      },
    };
  }
}
