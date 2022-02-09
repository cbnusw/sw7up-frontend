import { Directive, HostBinding, Input } from '@angular/core';
import { TColor } from '../../../types/color';


@Directive({
  selector: '[swButtonColor]'
})
export class ButtonColorDirective {
  @Input() hue = 500;
  @HostBinding('class') classes = `bg-indigo-${this.hue + 100} hover:bg-indigo-${this.hue + 200} focus:ring-indigo-${this.hue}`;

  constructor() {
  }

  @Input() set swButtonColor(color: TColor) {
    // 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink';
    switch (color) {
      case 'amber':
        this.classes = 'bg-amber-600 hover-amber-700 focus:ring-ember-500 text-white';
        break;
      case 'blue':
        this.classes = 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white';
        break;
      case 'cyan':
        this.classes = 'bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 text-white';
        break;
      case 'dark':
        this.classes = 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 text-white';
        break;
      case 'emerald':
        this.classes = 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500 text-white';
        break;
      case 'fuchsia':
        this.classes = 'bg-fuchsia-600 hover:bg-fuchsia-700 focus:ring-fuchsia-500 text-white';
        break;
      case 'gray':
        this.classes = 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-100 text-gray-700';
        break;
      case 'green':
        this.classes = 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white';
        break;
      case 'indigo':
        this.classes = 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white';
        break;
      case 'lime':
        this.classes = 'bg-lime-600 hover:bg-lime-700 focus:ring-lime-500 text-white';
        break;
      case 'neutral':
        this.classes = 'bg-neutral-600 hover:bg-neutral-700 focus:ring-neutral-500 text-white';
        break;
      case 'orange':
        this.classes = 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 text-white';
        break;
      case 'pink':
        this.classes = 'bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 text-white';
        break;
      case 'purple':
        this.classes = 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 text-white';
        break;
      case 'red':
        this.classes = 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white';
        break;
      case 'rose':
        this.classes = 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500 text-white';
        break;
      case 'sky':
        this.classes = 'bg-sky-600 hover:bg-sky-700 focus:ring-sky-500 text-white';
        break;
      case 'slate':
        this.classes = 'bg-slate-600 hover:bg-slate-700 focus:ring-slate-500 text-white';
        break;
      case 'stone':
        this.classes = 'bg-stone-600 hover:bg-stone-700 focus:ring-stone-500 text-white';
        break;
      case 'teal':
        this.classes = 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 text-white';
        break;
      case 'violet':
        this.classes = 'bg-violet-600 hover:bg-violet-700 focus:ring-violet-500 text-white';
        break;
      case 'yellow':
        this.classes = 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 text-white';
        break;
      case 'zinc':
        this.classes = 'bg-zinc-600 hover:bg-zinc-700 focus:ring-zinc-500 text-white';
        break;
      default:
        this.classes = 'bg-gray-200 hover:bg-blue-300 focus:ring-gray-100 text-gray-700';
    }
  }
}
