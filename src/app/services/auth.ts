import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  users: User[] = [
    { username: 'Admin', password: '123', roles: ['ADMIN'] },
    { username: 'Aya', password: '123', roles: ['USER'] },
  ];
  public roles!: string[];
  public loggedUser!: string; // nom de l'utilisateur connecté
  public isloggedIn: Boolean = false; // indique si l'utilisateur est connecté ou non

  constructor(private router: Router) {}

  // déconnecter l'utilisateur
  logout() {
    this.isloggedIn = false;
    this.loggedUser = undefined!;
    this.roles = undefined!;
    localStorage.removeItem('loggedUser');
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.router.navigate(['/login']);
  }

  // vérifier si l'utilisateur existe dans le tableau users
  SignIn(user: User): Boolean {
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
      if (user.username == curUser.username && user.password == curUser.password) {
        validUser = true;
        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });
    return validUser;
  }

  // vérifier si l'utilisateur connecté possède le rôle ADMIN
  isAdmin(): Boolean {
    if (!this.roles) return false;
    return this.roles.indexOf('ADMIN') > -1;
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    this.getUserRoles(login);
  }

  getUserRoles(username: string) {
    this.users.forEach((curUser) => {
      if (curUser.username == username) {
        this.roles = curUser.roles;
      }
    });
  }
}
