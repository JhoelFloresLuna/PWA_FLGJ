'use strict'

const listUsers = async() => {
    try {
       return fetch('https://reqres.in/api/users?page=2').then(res =>res.json());
    } catch (error) {
        throw 'Something went wrong';
    }
}

const registerUser = async (obj) => {
    try {
       return fetch('https://reqres.in/api/users', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(obj), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => {
            if(res.ok) {
              return res.json();
            }
            return res.text().then(text => {throw new Error(text)})
          }).catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
         
          
    } catch (error) {
        return 'error'
    }
}

const getNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const start = async () => {
    
    document.getElementById("form").style.display="none"
    const {data} = await listUsers()
    let counter =1;
    data.forEach(element => {
        let card=`
        <div class="col-lg">
            <div class="card custom-card">
            <div class="card-cover" style="background-image: url( https://picsum.photos/600/400/?${getNumber(10,50)} );">
                <div class="circle-image" style="background-image: url( ${element.avatar} );"></div>
            </div>        
            <div class="card-body">
                <h5 class="card-title">${element.first_name} ${element.last_name}</h5>
                <p class="card-text">Email ${element.email}</p>
            </div>
            </div>
        </div>
        `;
        counter++
        if(counter>4){
            document.getElementById("registro2").insertAdjacentHTML("beforeend",card);
        }else{
            document.getElementById("registros").insertAdjacentHTML("beforeend",card);
        }
    });
    setTimeout(() => {
        document.getElementById("main").classList.add("loaded");
    }, 2000)
    
    
}

const getForm = () => {
    document.getElementById("view").style.display="none"
    document.getElementById("form").style.display="block"
}

const resetForm = () => {
    document.getElementById("view").style.display="block"
    document.getElementById("form").style.display="none"
    document.getElementById("inputName").value="";
    document.getElementById("inputJob").value="";
}

const sendForm = async (event) => {
    event.preventDefault();
    const name = document.getElementById("inputName").value;
    const job = document.getElementById("inputJob").value;

    if(name==="" || job===""){
        Swal.fire(
            'Por favor completa todo los campos',
            '',
            'warning'
          )
    }else{
        const user = {
            "name": name,
            "job": job
        };
       
        const response = await registerUser(user);
        Swal.fire('Registro exitoso!', `Nombre: ${response.name}
         Puesto: ${response.job}`, 'success')
        document.getElementById("inputName").value="";
        document.getElementById("inputJob").value="";
        resetForm()
    }
    
}



start()






