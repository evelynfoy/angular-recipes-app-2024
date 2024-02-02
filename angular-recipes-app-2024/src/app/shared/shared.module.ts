import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";
import { LoggingService } from "../logging.service";

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
		AlertComponent,
		PlaceholderDirective,
        DropdownDirective,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LoadingSpinnerComponent,
		AlertComponent,
		PlaceholderDirective,
        DropdownDirective,
        CommonModule
    ],
    providers:[LoggingService]
    
})
export class SharedModule {}