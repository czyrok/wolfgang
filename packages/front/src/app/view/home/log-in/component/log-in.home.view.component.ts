import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { LogInFormControllerModel, ReceiverLinkSocketModel, SenderLinkSocketModel } from 'common'

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
      username: [null, [Validators.minLength(4)]],
      password: [null, null]
    })
  }

  async onSubmitForm(): Promise<void> {
    if (this.form.valid) {
      const tokenLink: ReceiverLinkSocketModel<string>
        = (await this.socketSharedService.registerReceiver<string>('/home/log-in', 'trigger'))
          .subscribe((token: string) => {
            this.authSharedService.setToken(token)

            this.router.navigateByUrl('/games')

            tokenLink.unsubscribe()
            errorLink.unsubscribe()
          })

      const errorLink: ReceiverLinkSocketModel<any>
        = (await this.socketSharedService.registerReceiver<any>('/home/log-in', 'trigger-failed'))
          .subscribe((error: any) => {
            this.displayAlertSharedService.emitDanger(error)

            tokenLink.unsubscribe()
            errorLink.unsubscribe()
          })

      const triggerLink: SenderLinkSocketModel<LogInFormControllerModel>
        = await this.socketSharedService.registerSender<LogInFormControllerModel>('/home/log-in', 'trigger')

      triggerLink.emit(new LogInFormControllerModel(this.form.get('username')?.value, this.form.get('password')?.value))
    }
  }
}
