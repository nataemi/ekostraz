import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'statuspipe'

}) export class StatusPipe implements PipeTransform {


  transform(input: number): string{
    return LetType[input];
  } }

export enum LetType {
  'Do weryfikacji' = 1,
  'Do podjecia' = 2,
  'W toku' = 3,
  'Zamknięta' = 4
}
