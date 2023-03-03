import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { SignUpFormControllerModel, ReceiverLinkSocketModel, SenderLinkSocketModel } from 'common'

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
      username: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  async onSubmitForm(): Promise<void> {
    if (this.form.valid) {
      const tokenLink: ReceiverLinkSocketModel<string>
        = await this.socketSharedService.registerReceiver<string>('/home/sign-up', 'trigger')

      tokenLink.subscribe(async (token: string) => {
        await this.authSharedService.setToken(token)

        this.router.navigateByUrl('/game')

        tokenLink.unsubscribe()
        errorLink.unsubscribe()
      })

      const errorLink: ReceiverLinkSocketModel<any>
        = await this.socketSharedService.registerReceiver<any>('/home/sign-up', 'trigger-failed')

      errorLink.subscribe((error: any) => {
        this.displayAlertSharedService.emitDanger(error)

        tokenLink.unsubscribe()
        errorLink.unsubscribe()
      })

      const triggerLink: SenderLinkSocketModel<SignUpFormControllerModel>
        = await this.socketSharedService.registerSender<SignUpFormControllerModel>('/home/sign-up', 'trigger')

      triggerLink.emit(new SignUpFormControllerModel(
        this.form.get('username')?.value,
        this.form.get('email')?.value,
        this.form.get('password')?.value
      ))
    }
  }
}
