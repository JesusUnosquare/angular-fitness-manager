import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workout'
})
export class WorkoutPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
   if(value.name !== ''){
    console.log(value);
     if(value.type === 'endurance') {
       return `Distance: ${value.endurance.distance + 'km'},Duration: ${value.endurance.duration + 'mins'}`;
     } else {
       return `Weight: ${value.strength.weight + 'kg'},Reps: ${value.strength.reps },Sets: ${value.strength.sets}`;
     }
   } else return '';
  }

}
