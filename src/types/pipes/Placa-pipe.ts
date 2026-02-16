import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'placa',
  standalone: true, // remova se NÃO estiver usando standalone
})
export class PlacaPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';

    // Remove tudo que não for letra ou número
    const limpa = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    // Placa padrão antiga (ABC1234)
    if (limpa.length === 7) {
      return `${limpa.slice(0, 3)}-${limpa.slice(3)}`;
    }

    return limpa;
  }
}
