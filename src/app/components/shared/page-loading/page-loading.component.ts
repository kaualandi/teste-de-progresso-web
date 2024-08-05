import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  selector: 'page-loading',
  templateUrl: './page-loading.component.html',
  styleUrls: ['./page-loading.component.scss'],
})
export class PageLoadingComponent implements OnInit {
  activeLogo = 0;
  $intervalActiveLogos = interval(250).pipe(takeUntilDestroyed());

  ngOnInit(): void {
    this.$intervalActiveLogos.subscribe({
      next: () => {
        this.activeLogo = this.activeLogo === 4 ? 0 : this.activeLogo + 1;
      },
    });
  }
}
