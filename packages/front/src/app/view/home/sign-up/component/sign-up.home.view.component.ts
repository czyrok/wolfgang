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
export class SignUpHomeViewComponent {
  form: UntypedFormGroup

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private socketSharedService: SocketSharedService,
    private authSharedService: AuthSharedService,
    private displayAlertSharedService: DisplayAlertSharedService
  ) {
    this.form = this.formBuilder.group({
      username: [null, [Validators.minLength(4)]],
      email: [null, [Validators.email]],
      password: [null, null]
    })
  }

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
