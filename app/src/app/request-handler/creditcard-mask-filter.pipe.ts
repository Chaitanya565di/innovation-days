import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'creditCardPipe'})
export class CreditcardMaskFilterPipe implements PipeTransform {
  transform(plainCreditCard: string): string {
    return 'BE' + plainCreditCard.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
  }
}
