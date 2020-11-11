import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'formatPhone'
})
export class FormatPhonePipe implements PipeTransform{
  transform(value: any) : string {

    let output : string = "";
    if(value.charAt(0) === '0')
      output = "+33" + value.substring(1);
    else if( value.charAt(0) === '+')
      output = value;
    else if (value.charAt(0) !== '0')
      output = "+" + value
    else
      output = "+33"
    

    return output;

  }


}