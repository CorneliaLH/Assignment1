import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDarken]',
})
export class DarkenDirective {
  @Input('appDarken') speed: number = 0;
  uppercase: boolean = false;
  constructor(private el: ElementRef) {}
  @HostListener('mouseenter') onMouseEnter() {
    const variable1 = this.el.nativeElement as HTMLElement;
    variable1.style.transition = 'all ' + this.speed + 's';
    variable1.style.boxShadow =
      '1px 1px 2px black, 0 0 25px white, 2 2 7px darkblue';
    variable1.style.backgroundColor = '#0b0e24bd';
    // variable1.style.textTransform = 'uppercase';
  }
  @HostListener('mouseleave') onMouseLeave() {
    const variable2 = this.el.nativeElement as HTMLElement;
    variable2.style.backgroundColor = 'transparent';
    variable2.style.boxShadow =
      '1px 1px 2px black, 0 0 25px white, 0 0 5px darkblue';
    variable2.style.transition = 'all ' + this.speed + 's';
    // variable2.style.textTransform = 'lowercase';
  }
}
