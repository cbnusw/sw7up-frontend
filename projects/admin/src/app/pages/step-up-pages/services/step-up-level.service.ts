import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStepUpLevel, StepUpService } from 'shared';

@Injectable()
export class StepUpLevelService {
  readonly selected$: Observable<IStepUpLevel | null>;

  private readonly _selectedSubject: BehaviorSubject<IStepUpLevel | null> = new BehaviorSubject<IStepUpLevel | null>(null);
  private readonly _levelsSubject: BehaviorSubject<IStepUpLevel[]> = new BehaviorSubject<IStepUpLevel[]>([]);

  constructor(private readonly _stepUpService: StepUpService) {
    this.selected$ = this._selectedSubject.asObservable();
    this._search();
  }

  get selected(): IStepUpLevel | null {
    return this._selectedSubject.value;
  }

  set selected(level: IStepUpLevel) {
    this._selectedSubject.next(level);
  }

  get levels(): IStepUpLevel[] {
    return this._levelsSubject.value;
  }

  createStepUpLevel(name: string): void {
    this._stepUpService.createLevel(name).subscribe({
      next: () => this._search(),
    });
  }

  updateStepUpLevel(id: string, name: string): void {
    this._stepUpService.updateLevel(id, name).subscribe({
      next: () => {
        const level = this.levels.find(lv => lv._id === id);
        if (level) {
          level.name = name;
        }
      },
    });
  }

  removeStepUpLevel(id: string): void {
    this._stepUpService.removeLevel(id).subscribe({
      next: () => {
        const idx = this.levels.findIndex(lv => lv._id === id);
        if (idx !== -1) {
          this._levelsSubject.next([...this.levels.slice(0, idx), ...this.levels.slice(idx + 1)]);
          this._setSelected();
        }
      }
    });
  }

  private _search(): void {
    this._stepUpService.getLevels().pipe(
      map(res => res.data)
    ).subscribe({
      next: levels => {
        this._levelsSubject.next(levels);
        this._setSelected();
      }
    });
  }

  private _setSelected(): void {
    if (!this.levels.find(lv => lv._id === this.selected?._id)) {
      this._selectedSubject.next(this.levels[0] || null);
    }
  }
}
