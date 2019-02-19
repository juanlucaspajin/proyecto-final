function insertBrand(brand) {
        const rawResponse = fetch('http://localhost:3000/brand/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(brand)
        }).then(window.location.reload());
};
function deleteBrand(id) {
    const rawResponse = fetch('http://localhost:3000/brand/delete', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"idbrand":id})
    }).then(window.location.reload());
};

function getBrandByName(name) {
    return fetch('http://localhost:3000/brands/' + name).
        then(response => response.json())
};
function getBrands(name) {
    return fetch('http://localhost:3000/brands').
        then(response => response.json())
};

const abmMarca = new Vue({
    el: '#abm',
    data:{
        nombreMarca: '',
        idMarca: Number,
        flag: false,
        marcas: []
    },
    mounted:function(){
        this.getAllBrands();
   },
    methods:{
        insertBrands() {
            let brand = {
                id: null,
                brandName: ''
            }
            brand.brandName = abmMarca.nombreMarca;
            insertBrand(brand);
            //window.location.reload(); 
        },

        deleteBrands() {
            let id;
            abmMarca.marcas.forEach(element => {
                if(element.brandName == abmMarca.nombreMarca) {
                    id = element.idbrand;
                }
            });
                deleteBrand(id);
                //window.location.reload(); 
        
        },

        getBrandById(id) {

        },

        getAllBrands(){
            getBrands().then(function(result) {
                result.forEach(element => {
                    abmMarca.marcas.push(element)
                });
            })
        }
    }
})