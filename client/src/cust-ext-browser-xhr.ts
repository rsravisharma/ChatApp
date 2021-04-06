
import {Injectable} from "@angular/core";
import {XhrFactory} from "@angular/common/http";
@Injectable()
/**
 * @author AhsanAyaz
 * We're extending the BrowserXhr to support CORS
 */
export class CustExtBrowserXhr extends XhrFactory {
  constructor() {
      super();
  }
  build(): any {
    let xhr = super.build();
    xhr.withCredentials = true;             // this is all the magic we need for now
    return <any>(xhr);
  }
}