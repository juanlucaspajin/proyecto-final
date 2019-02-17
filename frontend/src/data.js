function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

function getOneUser(user) {
    return fetch('http://localhost:3000/users/' + user).
        then(response => response.json())
};

const app = new Vue({
    el: '#login',
    data: {
        username: '',
        pass: '',
        cond: true,
        load: true,
        mal: 'Usuario incorrecto',
        userData: {
            u: String,
            p: String,
            type: String,
            creationDate: String
        },
        flag: false
    },
    methods: {

        verificar() {
            getOneUser(app.username).then(function(result){
                app.userData.u = result[0].user;
                app.userData.p = result[0].password;
                app.userData.type = result[0].type;
                app.userData.creationDate = result[0].creationDate;

                if(((app.username == app.userData.u) && (app.pass == app.userData.p))) {
                    app.cond = true;
                    window.location.replace('http://127.0.0.1:5500/frontend/src/administration.html');
                } else {
                    app.cond = false;
                    app.load = false;
                };
            });
        },
    }
})