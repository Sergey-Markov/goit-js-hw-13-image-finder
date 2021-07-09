const API_KEY = '22326636-8d9d25d1f9cff7f7e66e8dd75';
const BASE_URL = 'https://pixabay.com/api/';




export default class ApiService {
    constructor(){
        this.imageSearch = '';
        this.numberOfPage = 1;

    }

    fetchCountries(){
        return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.imageSearch}&page=${this.numberOfPage}&per_page=12&key=${API_KEY}`)
            .then(response => {
                return response.json();
            })
     };

     nextPage(){
         this.numberOfPage +=1;
     }
     ressetPage(){
         this.numberOfPage = 1;
     }

     get query(){
         return this.imageSearch;
     }
     set query(newQuery){
         this.imageSearch = newQuery;

     }
};