import { DiagnosticsBuilder, DiagnosticSeverity } from "../../../Lib/Types/DiagnosticsBuilder/include";
import { OffsetWord } from "../../Types/OffsetWord";
import { general_integer_diagnose } from './Integer';
import { general_float_diagnose } from './Float';

export function general_range_integer_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  let upper = Number.MAX_SAFE_INTEGER;
  let lower = Number.MIN_SAFE_INTEGER;

  const index = value.text.indexOf('..');

  //has ..
  if (index >= 0) {
    //Grab texts
    let lowerText = value.text.slice(0, index);
    let upperText = value.text.slice(index + 2);

    //To continue or not
    let co = true;

    //If the text is filled, diagnose it as integer. if that returns false it has an error, then mark 'co'ntinue as false
    if (lowerText !== "" && !general_integer_diagnose(OffsetWord.create(lowerText, value.offset), diagnoser)) co = false;
    if (upperText !== "" && !general_integer_diagnose(OffsetWord.create(upperText, value.offset + index + 2), diagnoser)) co = false;

    //Return if marked to not continue
    if (!co) return;

    //Parse values
    if (lowerText !== "") lower = Number.parseInt(lowerText);
    if (upperText !== "") upper = Number.parseInt(upperText);
  }
  else {
    //Just an integer
    general_integer_diagnose(value, diagnoser);
    return;
  }

  //Check if the lowest value is not higher then lower
  if (lower > upper) {
    diagnoser.Add(value.offset, "Lower range was greater than the high range", DiagnosticSeverity.error, "range.integer.invalid");
  }
}

export function general_range_float_diagnose(value: OffsetWord, diagnoser: DiagnosticsBuilder): void {
  let upper = Number.MAX_VALUE;
  let lower = Number.MIN_VALUE;  

  const index = value.text.indexOf('..');

  //has ..
  if (index >= 0) {
    //Grab texts
    let lowerText = value.text.slice(0, index);
    let upperText = value.text.slice(index + 2);

    //To continue or not
    let co = true;

    //If the text is filled, diagnose it as integer. if that returns false it has an error, then mark 'co'ntinue as false
    if (lowerText !== "" && !general_float_diagnose(OffsetWord.create(lowerText, value.offset), diagnoser)) co = false;
    if (upperText !== "" && !general_float_diagnose(OffsetWord.create(upperText, value.offset + index + 2), diagnoser)) co = false;

    //Return if marked to not continue
    if (!co) return;

    //Parse values
    if (lowerText !== "") lower = Number.parseFloat(lowerText);
    if (upperText !== "") upper = Number.parseFloat(upperText);
  }
  else {
    //Just an integer
    general_float_diagnose(value, diagnoser);
    return;
  }

  //Check if the lowest value is not higher then lower
  if (lower > upper) {
    diagnoser.Add(value.offset, "Lower range was greater than the high range", DiagnosticSeverity.error, "range.float.invalid");
  }
}