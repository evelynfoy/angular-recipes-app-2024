import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataStorageService } from "../data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    isLoggedIn : boolean = false;
    sub : Subscription;

    constructor(private dataStorageService : DataStorageService, private authService: AuthService) {}

    ngOnInit(): void {
        this.sub = this.authService.user.subscribe(
            user => { this.isLoggedIn = !!user ? true : false }
        );
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}