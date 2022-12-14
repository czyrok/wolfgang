import { Component } from '@angular/core'

@Component({
  selector: 'app-view-main-games-play',
  templateUrl: './play.games.main.view.component.html',
  styleUrls: ['./play.games.main.view.component.scss']
})
export class PlayGamesMainViewComponent {
  displayChat: boolean = true

  changeDisplayChatButtonCallback: () => void = () => {
    this.displayChat = !this.displayChat
  }
}
