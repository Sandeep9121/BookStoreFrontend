import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/Service/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {
  public error = null;
  public hide = true;
  public valideUser = false;
  public tokenValue = null;
  public isLoading = false;
  public form = {
    email: null,
    password: null,
    role: null
  };

  constructor(private user: UserService,
              private token: TokenService,
              private route: Router,
              private matSnackBar: MatSnackBar,
              private titleService: Title
    ) {
      this.setTitle('Fundoo Notes');
  }
  handleError(error: { error: any; }) {
    this.isLoading = false;
    this.error = error.error.message;
    if ( error.error.status === 0) {
      console.log('please connect database');
    }
    this.matSnackBar.open(this.error, 'ok', {
      duration: 5000
    });
    console.log(error);
  }
  ngOnInit() {
  }
  onSubmit() {
    this.isLoading = true;
    this.user.signIn(this.form).subscribe(
     data => this.handleResponse(data),
     error => this.handleError(error)
   );
  }

  handleResponse(data) {
    this.token.handle(data);
    this.isLoading = false;
    this.token.logedIn(true);
    console.log('user is --->' + data);
    this.matSnackBar.open('Sucessfully Login', 'ok', {
      duration: 5000
    });
    if (this.form.role === 'admin') {
      this.route.navigateByUrl('Displaybook');
      return;
    }
    if (this.form.role === 'seller') {
      this.route.navigateByUrl('seller');
      return;
    }
    if (this.form.role === 'user') {
      this.route.navigateByUrl('Displaybook');
      return;
    }
}

  public setTitle( dashboard: string) {
    this.titleService.setTitle( dashboard );
    }
}
