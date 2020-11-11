import { Directive,  ElementRef,    HostListener,    Input, SimpleChanges } from "@angular/core";


@Directive({
  selector: '[appMatch]'
})
export class MatchDirective{

  constructor(private el : ElementRef){}

  @Input() valueToConfirm : string;
  
  @HostListener('focus', ['$event']) onFocus = (event: any) => {
    this.onChange(event);
  }
  @HostListener('keyup', ['$event']) onChange = (event: any) => {
    const value : string = (event.target as HTMLInputElement).value;
    if(value === this.valueToConfirm){
      this.el.nativeElement.style.backgroundColor = "transparent";
    }
    else if(value === ""){
      this.el.nativeElement.style.backgroundColor = "transparent";
    }
    else{
      this.el.nativeElement.style.backgroundColor = "red";
    }
    
  }


}