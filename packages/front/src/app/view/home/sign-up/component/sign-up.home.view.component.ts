import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { SignUpFormControllerModel, LinkNamespaceSocketModel } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'
import { AuthSharedService } from 'src/app/shared/auth/service/auth.shared.service'
import { DisplayAlertSharedService } from 'src/app/shared/alert/display/service/display.alert.shared.service'

@Component({
  selector: 'app-view-home-sign-up',
  templateUrl: './sign-up.home.view.component.html',
  styleUrls: ['./sign-up.home.view.component.scss']
})
/**
 * Composant de la vue de d'inscription
 */
export class SignUpHomeViewComponent {
  form: UntypedFormGroup

  /**
   * @param router Service qui permet de naviguer entre les vues et de manipuler les URLs.
   * @param formBuilder Service qui permet de construire des formulaires
   * @param socketSharedService Service qui permet d'utiliser des sockets
   * @param authSharedService Service d'authentification des utilisateurs
   * @param displayAlertSharedService Service qui permet de gérer l'affichage des alertes d'autentification
   */
  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private socketSharedService: SocketSharedService,
    private authSharedService: AuthSharedService,
    private displayAlertSharedService: DisplayAlertSharedService
  ) {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  /**
   * Permet de gérer la redirection en fonction de l'inscription de l'utilisateur
   */
  async onSubmitForm(): Promise<void> {
    if (this.form.valid) {
      const signUpLink: LinkNamespaceSocketModel<SignUpFormControllerModel, string> = await this.socketSharedService.buildLink('/home/sign-up', 'trigger')

      signUpLink.on(async (token: string) => {
        signUpLink.destroy()

        await this.authSharedService.setToken(token)

        this.router.navigateByUrl('/game')
      })

      signUpLink.onFail((error: any) => {
        signUpLink.destroy()

        this.displayAlertSharedService.emitDanger(error)
      })

      signUpLink.emit(new SignUpFormControllerModel(
        this.form.get('username')?.value,
        this.form.get('email')?.value,
        this.form.get('password')?.value
      ))
    }
  }
}
