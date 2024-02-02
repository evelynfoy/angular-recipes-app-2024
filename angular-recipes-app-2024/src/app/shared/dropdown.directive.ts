import { Directive, HostListener, HostBinding, ElementRef } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;
    // private classes: string[];
    // constructor(private renderer: Renderer2,private elementRef: ElementRef ) {};
    constructor(private elementRef: ElementRef ) {};

    // @HostListener('click') toggleOpen() {
    //     this.isOpen = !this.isOpen;
    // }
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }
    // @HostListener('click') click(){
    //     this.classes = this.elementRef.nativeElement.classList.value;
    //     if (this.classes.indexOf('open') > 0) {
    //         this.renderer.removeClass(this.elementRef.nativeElement,'open')
    //     }
    //     else {
    //         this.renderer.addClass(this.elementRef.nativeElement,'open')
    //     }
    // }

}