import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestRequestRestService {
  private apiUrl = 'https://charge24-beta.com/api/v1/login';
  private api_2Url = 'https://charge24-beta.com/api/v1/get_all_banner_ads_backoffice?operator=charge24';



  constructor(private http: HttpClient) { }

  loginUser(): Observable<any> {
    // Headers
    const headers = new HttpHeaders({
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'th,en;q=0.9,en-US;q=0.8',
      'authorization': 'Bearer null',
      'content-type': 'application/json',
      'origin': 'http://localhost:4200',
      'referer': 'http://localhost:4200/',
      'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    });

    // Body 
    const body = {
      email: 'software.account@charge24.co.th',
      password: '0VYr`[Bw#5p1'
    };

    // ส่ง API Request
    return this.http.post(this.apiUrl, body, { headers });
  }

  GetItems(): Observable<any> {
    // Headers ที่ต้องใช้
    const headers = new HttpHeaders({
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'th,en;q=0.9,en-US;q=0.8',
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2luZm8iOnsiaWQiOjQ3LCJlbWFpbCI6InNvZnR3YXJlLmFjY291bnRAY2hhcmdlMjQuY28udGgiLCJmaXJzdF9uYW1lIjoic3VwZXJhZG1pbiAiLCJsYXN0X25hbWUiOiJDaGFyZ2UyNCIsImNhbl9yZXNldCI6ZmFsc2UsInV1aWQiOiIzZWQ1NTQ1NCIsInBvc2l0aW9uIjoiIiwicm9sZSI6InN1cGVyYWRtaW4iLCJvcGVyYXRvciI6InRpZXIxIiwidGllcl9sZXZlbCI6MSwibGFuZGxvcmQiOm51bGx9fQ.Taxxzbl_Dk_s0qz86SzaX3E-p5vQWg9SH2cK3gXZJkU',
      'content-type': 'application/json',
      'origin': 'http://localhost:4200',
      'referer': 'http://localhost:4200/',
      'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
    });

    //ส่ง GET Request ไป API
    return this.http.get(this.api_2Url, { headers });
  }

  GetItemsMockup(): Observable<any> {

    const headers = new HttpHeaders({

    });

    return this.http.get(this.api_2Url, { headers });
  }
}
