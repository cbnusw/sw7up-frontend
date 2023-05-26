import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartColorService {
  getColors(length: number, opacity = 0.55): string[] {
    const random = () => Math.floor(Math.random() * 200);
    return Array.from({ length }).map(_ => {
      const rgb = [random(), random(), random()];
      return `rgba(${rgb.join(', ')}, ${opacity}`;
    });
  }
}
