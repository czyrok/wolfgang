import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appSharedUserAvatarAll]'
})
export class AllAvatarUserSharedDirective implements AfterViewInit {
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>
  ) { }

  ngAfterViewInit(): void {
    console.log(this.elementRef, this.active)
    this.resize()
    this.resize()
  }

  @HostListener('window:resize') resize() {
    if (!this.active) return

    const width: number = (1280 * this.elementRef.nativeElement.offsetHeight) / 1866

    this.renderer.setStyle(this.elementRef.nativeElement, 'width', width + 'px')
  }

  @Input() active!: boolean
}
