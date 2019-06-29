import { Injectable } from '@angular/core';

@Injectable()
export class SelectedEntryService{
  private data:any = undefined;

  setData(data:any){
    console.log("in sevice:" + data);
    this.data = data;
  }

  getData():any{
    return {
      id: '12',
      name: 'a',
      phone: '23',
      description: 'sadlknflwfq fneiwfl;wef/kqdwn klwdqj;fleanfe lkew;fajlfknw fwlkzfwakcn/ ,klewfann `fw .nflw;anwf',
      adres: 'skldad',
      entryDate: 'dnskjad',
      status: 'sakdnls',
      surname: 'sakdsld',
      email: 'asdklnsd',
      city: 'wroclaw'
    };
  }
}
