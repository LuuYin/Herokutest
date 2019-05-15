import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class DataProvider {

    public data: any;
    public TABLE: string = 'simple-shape_STC_v2';

    constructor(public http: HttpClient) {
    
    }

    getData() {
        return this.http.get('./assets/data/clusters.json');
    }

    public getImageSets() {
        
        return new Promise(resolve => {
            this.getData().subscribe((data) => {
                this.data = data;

                let numberOfClusters = this.data.length
                let random_cluster = Math.floor(Math.random() * numberOfClusters);
                console.log(random_cluster)
                // console.log(this.data)

                while (this.data[random_cluster].length < 3) {
                    let numberOfClusters = this.data.length
                    random_cluster = Math.floor(Math.random() * numberOfClusters);
                }
                
                let r = []
                for (let i = 0; i <= 2; i++) {
                    let rand = Math.floor(Math.random() * this.data[random_cluster].length);
                    let string = this.data[random_cluster][rand];

                    while (r.indexOf(string) > -1) {
                        rand = Math.floor(Math.random() * this.data[random_cluster].length);
                        string = this.data[random_cluster][rand];
                    }
                    r.push(string)
                }
    
                resolve(r)
            });
        })  
        
    }

    public async addToGD(post_data: any): Promise<any> {

        try {
            // 'http://127.0.0.1:8000/add'
            let header = new HttpHeaders();
            header.set('Access-Control-Allow-Origin', '*');
            await this.http.post('https://asv055hou0.execute-api.eu-central-1.amazonaws.com/dev/add2sql/' + this.TABLE, JSON.stringify(post_data), { headers: header }).subscribe();
        }catch (err){
            alert('error error');
        }

    }

}
