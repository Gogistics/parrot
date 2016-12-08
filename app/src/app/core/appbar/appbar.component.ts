import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../auth';
import { ProjectMenuService } from './../services/project-menu.service';

@Component({
    selector: 'appbar',
    templateUrl: 'appbar.component.html',
    styleUrls: ['appbar.component.css']
})
export class AppBarComponent implements OnInit {
    @Input()
    title: string;

    private isMenuActive: boolean;

    constructor(private auth: AuthService, private router: Router, private projectMenu: ProjectMenuService) { }

    ngOnInit() {
        this.projectMenu.menuActive
            .subscribe(active => this.isMenuActive = active);
    }

    openMenu() {
        this.projectMenu.setActive();
    }

    get isAuth(): boolean {
        return this.auth.isLoggedIn();
    }

    logout(): void {
        this.auth.removeToken();
        this.router.navigate(['/login']);
    }
}