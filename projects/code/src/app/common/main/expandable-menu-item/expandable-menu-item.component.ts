import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IMenuItem } from '../../../types/menu-item';

@Component({
  selector: 'sw-expandable-menu-item',
  templateUrl: './expandable-menu-item.component.html',
  styleUrls: ['./expandable-menu-item.component.scss']
})
export class ExpandableMenuItemComponent implements OnInit, AfterViewInit {

  @Input() menuItem: IMenuItem;
  @Output() hiddenSubMenusChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('subMenus') subMenusRef: ElementRef;

  private _hiddenSubMenus = true;

  constructor(private renderer: Renderer2,
              private sanitizer: DomSanitizer) {
  }

  @Input() set hiddenSubMenus(hidden: boolean) {
    this._hiddenSubMenus = hidden;
    if (this.subMenusRef) {
      this.renderer.setStyle(this.subMenusRef.nativeElement, 'height', hidden ? '0' : `${this.height}px`);
    }
  }

  get hiddenSubMenus(): boolean {
    return this._hiddenSubMenus;
  }

  get height(): number {
    return 36 * this.subMenuItems.length + 4 * (this.subMenuItems.length - 1);
  }

  get subMenuItems(): IMenuItem[] {
    return this.menuItem.subMenuItems ?? [];
  }

  get icon(): SafeHtml | null {
    if (this.menuItem.icon) {
      return this.sanitizer.bypassSecurityTrustHtml(this.menuItem.icon);
    }
    return null;
  }

  toggle(): void {
    this.hiddenSubMenus = !this.hiddenSubMenus;
    this.hiddenSubMenusChange.emit(this.hiddenSubMenus);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
}
