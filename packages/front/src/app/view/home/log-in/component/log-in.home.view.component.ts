import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { LinkNamespaceSocketModel, LogInFormControllerModel } from 'common'

import { SocketSharedService } from 'src/app/shared/socket/service/socket.shared.service'
import { AuthSharedService } from 'src/app/shared/auth/service/auth.shared.service'
import { DisplayAlertSharedService } from 'src/app/shared/alert/display/service/display.alert.shared.service'

@Component({
  selector: 'app-view-home-log-in',
  templateUrl: './log-in.home.view.component.html',
  styleUrls: ['./log-in.home.view.component.scss']
})
export class LogInHomeViewComponent {
  form: UntypedFormGroup

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private socketSharedService: SocketSharedService,
    private authSharedService: AuthSharedService,
    private displayAlertSharedService: DisplayAlertSharedService
  ) {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required]]
    })
  }

  async onSubmitForm(): Promise<void> {
    if (this.form.valid) {
      const logInLink: LinkNamespaceSocketModel<LogInFormControllerModel, string>
        = await this.socketSharedService.buildLink<LogInFormControllerModel, string>('/home/log-in', 'trigger')

      logInLink.on(async (token: string) => {
        logInLink.destroy()

        await this.authSharedService.setToken(token)

        this.router.navigateByUrl('/game')
      })

      logInLink.onFail((error: any) => {
        logInLink.destroy()

        this.displayAlertSharedService.emitDanger(error)
      })

      logInLink.emit(new LogInFormControllerModel(this.form.get('username')?.value, this.form.get('password')?.value))
    }
  }
}
