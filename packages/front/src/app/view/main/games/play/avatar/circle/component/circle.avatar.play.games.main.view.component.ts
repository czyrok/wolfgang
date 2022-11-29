import { AfterViewInit, Component, ElementRef, HostListener, Input, Renderer2, ViewChild, ViewContainerRef } from '@angular/core'
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
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    this.avatarsCircle = new CircleAvatarPlayGamesMainViewModel(this.renderer, this.viewContainerRefTarget, this.elementRefTarget)

    this.avatarsCircle.addPlayer('maxime')
    this.avatarsCircle.addPlayer('maxime2')
    this.avatarsCircle.addPlayer('maxime3')
    this.avatarsCircle.addPlayer('maxime4')
  }

  @Input() id!: string;

  @ViewChild('target') viewContainerRefTarget!: ViewContainerRef
  @ViewChild('widthTarget') elementRefTarget!: ElementRef<HTMLElement>

  @HostListener('resize') resize(): void {
    this.avatarsCircle.update()
  }
}

