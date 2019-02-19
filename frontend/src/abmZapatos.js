function insertShoe(shoe) {
    const rawResponse = fetch('http://localhost:3000/shoes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(shoe)
    }).then(window.location.reload());
};

function deleteShoe(id) {
    const rawResponse = fetch('http://localhost:3000/shoes/delete', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"idshoes":id})
    }).then(window.location.reload());
};

function getArticles() {
    return fetch('http://localhost:3000/articles').
        then(response => response.json())
};

function getShoes() {
    return fetch('http://localhost:3000/shoes').
        then(response => response.json())
};

function getUnrepeatedShoes() {
    return fetch('http://localhost:3000/shoes/articles').
        then(response => response.json())
};

const abmShoes = new Vue({
el: '#shoes',
data:{
    size: Number,
    stock: Number,
    price: Number,
    description: '',
    shoes: [],
    unrepeatedShoes: [],
    articulos: []
},
mounted:function(){
    this.getAllArticles();
    this.getAllShoes();
    this.getShoesByArticle()
},
methods:{
    insertShoes() {
        let idarticle;
        abmShoes.articulos.forEach(element => {
            if(element.description == abmShoes.description) {
                idarticle = element.idarticle;
            }
        });
        let shoe = {
            idshoe: null,
            size: abmShoes.size,
            stock: abmShoes.stock,
            price: abmShoes.price,
            idarticle: Number
        };
        shoe.idarticle = idarticle
        insertShoe(shoe);

    },

    deleteShoes() {
        let id;
        abmShoes.shoes.forEach(element => {
            if(element.description == abmShoes.description) {
                if(element.size == abmShoes.size){
                    id = element.idshoes;
                }
            }
        });

        console.log(id);
        deleteShoe(id);
        
    
    },

    getAllArticles(){
        getArticles().then(function(result){
            result.forEach(element => {
                abmShoes.articulos.push(element)
            });
        })
    },

    getAllShoes() {
        getShoes().then(function(result) {
            result.forEach(element => {
                abmShoes.shoes.push(element)
            })
        })
    },

    getShoesByArticle(){
        getUnrepeatedShoes().then(function(result) {
            result.forEach(element => {
                abmShoes.unrepeatedShoes.push(element)
            })
        })
    }
}
})