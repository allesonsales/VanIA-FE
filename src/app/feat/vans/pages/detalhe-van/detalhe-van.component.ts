import { Component, Input, OnInit } from '@angular/core';
import { VanService } from '../../../../service/van.service';
import { Van } from '../../../../../types/Van';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../../../shared/components/header/header.component';

@Component({
  selector: 'app-detalhe-van',
  imports: [HeaderComponent],
  templateUrl: './detalhe-van.component.html',
  styleUrl: './detalhe-van.component.css',
})
export class DetalheVanComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private vanService: VanService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.vanService.buscarVan(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
