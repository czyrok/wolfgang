import { Component } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { UserSharedService } from 'src/app/shared/user/service/user.shared.service'

@Component({
  selector: 'app-view-main-home-username',
  templateUrl: './username.home.main.view.component.html',
  styleUrls: ['./username.home.main.view.component.scss']
})
export class UsernameHomeMainViewComponent {
  form: UntypedFormGroup

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private userSharedService: UserSharedService
  ) {
    this.form = this.formBuilder.group({
      username: [null, [Validators.minLength(4)]]
    })
  }

  onSubmitForm(): void {
    if (this.form.valid) {
      this.userSharedService.username = this.form.get('username')?.value
      this.router.navigateByUrl('/games')
    }
  }
}
