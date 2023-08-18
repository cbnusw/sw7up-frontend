import { Component, HostBinding, Input } from '@angular/core';
import { CodingGrade, ProjectCodes } from '../../../../types';
import { between, moreThan } from '../../../utils';

@Component({
  selector: 'sw-coding-level',
  templateUrl: './coding-level.component.html',
  styleUrls: ['./coding-level.component.scss'],
})
export class CodingLevelComponent {
  @Input() grade: CodingGrade = CodingGrade.BRONZE;
  @Input() level = 1;
  @Input() requiredCodes = 50;
  @Input() projects: ProjectCodes[] = [];
  isOpenPopup = false;

  private _currentCodes = 0;

  @Input() set currentCodes(codes: number) {
    const callback = () => {
      if (this._currentCodes < codes) {
        this._currentCodes++;
        requestAnimationFrame(callback);
      }
    };
    requestAnimationFrame(callback);
  }

  get currentCodes(): number {
    return this._currentCodes;
  }

  get progressWidth(): string {
    return Math.min(this.currentCodes, this.requiredCodes) * 100 / this.requiredCodes + '%';
  }

  get moreThanProjects(): number {
    if (this.grade === CodingGrade.GOLD && this.level === 10) {
      return 1;
    } else if (this.grade === CodingGrade.PLATINUM && this.level === 10) {
      return 2;
    }
    return 0;
  }

  get moreThanCodeLines(): number {
    if (this.grade === CodingGrade.GOLD && this.level === 10) {
      return 500;
    } else if (this.grade === CodingGrade.PLATINUM && this.level === 10) {
      return 1000;
    }
    return 0;
  }

  get currentProjects(): number {
    const between500And1000 = between(500, 1000, this.projects);
    const moreThan500 = moreThan(500, this.projects);
    const moreThan1000 = moreThan(1000, this.projects);
    if (this.grade === CodingGrade.GOLD) {
      return moreThan500;
    } else if (this.grade === CodingGrade.PLATINUM) {
      return between500And1000 > 0 ? moreThan1000 : Math.max(moreThan1000 - 1, 0);
    }
    return 0;
  }

  @HostBinding('class') get backgroundClass(): string {
    if (this.grade === CodingGrade.DIAMOND) {
      return 'bg-diamond';
    } else if (this.grade === CodingGrade.PLATINUM) {
      return 'bg-platinum';
    } else if (this.grade === CodingGrade.GOLD) {
      return 'bg-gold';
    } else if (this.grade === CodingGrade.SILVER) {
      return 'bg-silver';
    } else {
      return 'bg-bronze';
    }
  }

  get pathClass(): string {
    if (this.grade === CodingGrade.DIAMOND) {
      return 'fill-diamond';
    } else if (this.grade === CodingGrade.PLATINUM) {
      return 'fill-platinum';
    } else if (this.grade === CodingGrade.GOLD) {
      return 'fill-gold';
    } else if (this.grade === CodingGrade.SILVER) {
      return 'fill-silver';
    } else {
      return 'fill-bronze';
    }
  }

  get progressColorClass(): string {
    if (this.grade === CodingGrade.DIAMOND) {
      return 'bg-diamond';
    } else if (this.grade === CodingGrade.PLATINUM) {
      return 'bg-platinum';
    } else if (this.grade === CodingGrade.GOLD) {
      return 'bg-gold';
    } else if (this.grade === CodingGrade.SILVER) {
      return 'bg-silver';
    } else {
      return 'bg-bronze';
    }
  }

  get checkColor(): string {
    if (this.currentProjects < this.moreThanProjects) {
      return 'text-white';
    } else if (this.grade === CodingGrade.DIAMOND) {
      return 'text-diamond';
    } else if (this.grade === CodingGrade.PLATINUM) {
      return 'text-platinum';
    } else if (this.grade === CodingGrade.GOLD) {
      return 'text-gold';
    } else if (this.grade === CodingGrade.SILVER) {
      return 'text-silver';
    } else {
      return 'text-bronze';
    }
  }

  togglePopup(event: MouseEvent): void {
    event.stopPropagation();
    this.isOpenPopup = !this.isOpenPopup;
  }

  blurPopup(event: FocusEvent): void {
    event.stopPropagation();
    this.isOpenPopup = false;
  }
}
