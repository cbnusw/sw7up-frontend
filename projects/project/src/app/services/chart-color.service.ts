import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartColorService {
  getColors(length: number, opacity = 0.55): string[] {
    const random = () => Math.floor(Math.random() * 244 + 11);

    return Array.from({ length }).map(_ => {
      let rgb = [random(), random(), random()];
      while (rgb.reduce((a, b) => a + b, 0) > 550 || rgb.reduce((a, b) => a + b, 0) < 545) {
        rgb = [random(), random(), random()];
      }
      return `rgba(${rgb.join(', ')}, ${opacity}`;
    });
  }
}
