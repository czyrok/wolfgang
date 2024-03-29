import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Renderer2, ViewChild, ViewContainerRef } from '@angular/core'
import { StageStateGameEnum, StateGameModel } from 'common'

import { EventVoteUserSharedModel } from 'src/app/shared/user/vote/event/model/event.vote.user.shared.model'
import { CircleAvatarPlayViewModel } from '../model/circle.avatar.play.view.model'

@Component({
  selector: 'app-view-play-avatar-circle',
  templateUrl: './circle.avatar.play.view.component.html',
  styleUrls: ['./circle.avatar.play.view.component.scss']
})
/**
 * Composant permettant l'fichage des avatars en cercle l'or d'une partie
 */
export class CircleAvatarPlayViewComponent implements AfterViewInit {
  avatarsCircle!: CircleAvatarPlayViewModel

  first: boolean = true

  /**
   * @param renderer Permet d'implémenter un rendu personnalisé
   * @param changeDetectorRef Classe de base qui fournit la fonctionnalité de détection des changements
   */
  constructor(
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  /**
   * Met en place l'affichage en cercle après l'initialisation de la vue
   */
  ngAfterViewInit(): void {
    this.avatarsCircle = new CircleAvatarPlayViewModel(this.voteEvent, this.renderer, this.changeDetectorRef, this.targetRef, this.boxContainerRef)

    if (this.gameStateEvent !== undefined) this.gameStateEvent.subscribe((state: StateGameModel) => {
      if (state.stage !== StageStateGameEnum.AWAITING) {
        this.avatarsCircle.removeAll()

        this.avatarsCircle.setPlayers(state.players)

        this.avatarsCircle.update()
        this.avatarsCircle.update()

        this.first = false
      }

      if (state.stage === StageStateGameEnum.AWAITING) {
        this.avatarsCircle.removeAll()

        this.avatarsCircle.setPlayers(state.players)

        this.avatarsCircle.update()
        this.avatarsCircle.update()
      }
    })
  }

  @Input() voteEvent!: EventVoteUserSharedModel
  @Input() gameStateEvent!: EventEmitter<StateGameModel>

  @ViewChild('target', { read: ViewContainerRef }) targetRef!: ViewContainerRef
  @ViewChild('widthTarget') boxContainerRef!: ElementRef<HTMLElement>

  @HostListener('window:resize') resize(): void {
    this.avatarsCircle.update()
  }
}

