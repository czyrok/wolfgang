import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, Renderer2, ViewChild, ViewContainerRef } from '@angular/core'
import { AvatarSharedComponent } from 'src/app/shared/avatar/component/avatar.shared.component'

import { CircleAvatarPlayGamesMainViewModel } from '../model/circle.avatar.play.games.main.view.model'

@Component({
  selector: 'app-view-main-games-play-avatar-circle',
  templateUrl: './circle.avatar.play.games.main.view.component.html',
  styleUrls: ['./circle.avatar.play.games.main.view.component.scss']
})
export class CircleAvatarPlayGamesMainViewComponent implements AfterViewInit {
  avatarsCircle!: CircleAvatarPlayGamesMainViewModel

  constructor(
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.avatarsCircle = new CircleAvatarPlayGamesMainViewModel(this.renderer, this.changeDetectorRef, this.viewContainerRefTarget, this.elementRefTarget)

    this.avatarsCircle.setPlayers([
      'maxime',
      'maxime2',
      'maxime3',
      'maxime3',
      'maxime3',
      'maxime3',
      'maxime3'
    ])

    this.avatarsCircle.update()
  }

  @Input() id!: string;

  @ViewChild('target', { read: ViewContainerRef }) viewContainerRefTarget!: ViewContainerRef
  @ViewChild('widthTarget') elementRefTarget!: ElementRef<HTMLElement>

  @HostListener('window:resize') resize(): void {
    this.avatarsCircle.update()
  }
}

