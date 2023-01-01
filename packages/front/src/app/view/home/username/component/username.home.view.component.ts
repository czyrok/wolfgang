import { Component } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { UserService } from 'src/app/user/service/user.service'

@Component({
  selector: 'app-view-home-username',
  templateUrl: './username.home.view.component.html',
  styleUrls: ['./username.home.view.component.scss']
})
export class UsernameHomeViewComponent {
  form: UntypedFormGroup

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private userService: UserService
  ) {
    this.form = this.formBuilder.group({
      username: [null, [Validators.minLength(4)]]
    })
  }

  onSubmitForm(): void {
    if (this.form.valid) {
      this.userService.username = this.form.get('username')?.value
      this.router.navigateByUrl('/games')
    }
  }
}
