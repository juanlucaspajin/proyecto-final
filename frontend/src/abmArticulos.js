function insertArticle(article) {
    const rawResponse = fetch('http://localhost:3000/article', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(article)
    });
};

function deleteBrand(id) {
    const rawResponse = fetch('http://localhost:3000/article/delete', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"idarticle":id})
    });

    window.location.reload();
};

function getBrands() {
    return fetch('http://localhost:3000/brands').
        then(response => response.json())
};

function getArticles() {
    return fetch('http://localhost:3000/articles').
        then(response => response.json())
};

const abmArticulo = new Vue({
el: '#articles',
data:{
    nombreMarca: '',
    year: Number,
    season: '',
    description: '',
    marcas: [],
    articulos: []
},
mounted:function(){
    this.getAllBrands();
    this.getAllArticles();
},
methods:{
    insertArticle() {
        let idBrand;
        abmArticulo.marcas.forEach(element => {
            if(element.brandName == abmArticulo.nombreMarca) {
                idBrand = element.idbrand;
            }
        });
        let article = {
            idarticle: null,
            year: abmArticulo.year,
            season: abmArticulo.season,
            description: abmArticulo.description,
            idBrand: Number
        };
        article.idBrand = idBrand;

        insertArticle(article);

        window.location.reload(); 
    },

    deleteArticle() {
        let id;
        abmArticulo.articulos.forEach(element => {
            if(element.description == abmArticulo.description) {
                id = element.idbrand;
            }
        });
        deleteBrand(id);
        
    
    },
    getAllBrands(){
        getBrands().then(function(result) {
            result.forEach(element => {
                abmArticulo.marcas.push(element)
            });
        })
    },

    getAllArticles(){
        getArticles().then(function(result){
            result.forEach(element => {
                abmArticulo.articulos.push(element)
            });
        })
    }
}
})