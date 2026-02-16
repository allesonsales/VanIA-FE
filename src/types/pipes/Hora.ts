import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hora',
  standalone: true,
})
export class HoraPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';

    // caso venha "14:30:00"
    return value.substring(0, 5);
  }
}
