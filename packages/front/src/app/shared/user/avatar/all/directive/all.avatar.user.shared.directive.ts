import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core'

@Directive({
  selector: '[appSharedUserAvatarAll]'
})
export class AllAvatarUserSharedDirective implements AfterViewInit {
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>
  ) { }

  ngAfterViewInit(): void {
    if (!this.active) return

    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        this.updateHeight(entry.contentRect.height)
      })
    })
    
    observer.observe(this.elementRef.nativeElement)
  }

  updateHeight(height: number): void {
    if (!this.active) return
    
    const width: number = (1280 * height) / 1866

    this.renderer.setStyle(this.elementRef.nativeElement, 'width', width + 'px')
  }

  @Input() active!: boolean
}
