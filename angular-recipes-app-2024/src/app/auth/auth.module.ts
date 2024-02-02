import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

import { AuthComponent } from "./auth.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [ 
        CommonModule,
		FormsModule, 
		SharedModule,
        RouterModule.forChild([
            { path: '', component: AuthComponent}
        ])
    ],

})
export class AuthModule {}