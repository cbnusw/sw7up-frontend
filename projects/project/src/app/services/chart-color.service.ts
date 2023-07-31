import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartColorService {
  colors: string[] = [];

  getColors(length: number, opacity = 0.6): string[] {
    const random = (on: boolean) => Math.floor(Math.random() * (on ? 40 : 150) + (on ? 215 : 40));
    if (this.colors.length < length) {
      length = length - this.colors.length;
      const newColors = Array.from({ length }).map((_, i) => {
        let rgb = [random(i % 3 === 0), random(i % 3 === 1), random(i % 3 === 2)];
        while (rgb.reduce((a, b) => a + b, 0) > 730 || rgb.reduce((a, b) => a + b, 0) < 540) {
          rgb = [random(i % 3 === 0), random(i % 3 === 1), random(i % 3 === 2)];
        }
        return `rgba(${rgb.join(', ')}, ${opacity}`;
      });
      this.colors = [...this.colors, ...newColors];
    }

    return this.colors;
  }
}
