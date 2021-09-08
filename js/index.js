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
            method: 'POST', 
            body: JSON.stringify(obj), 
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
        const card=`
        <div class="col-lg">
            <div class="card custom-card">
            <div class="card-cover" style="background-image: url( https://picsum.photos/600/400/?${getNumber(1,50)} );">
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
    chargeLoader()
    
}

const chargeLoader = () => {
    setTimeout(() => {
        document.getElementById("main").classList.remove("loaded");
        document.getElementById("main").classList.add("loaded");
    }, 2000);
}

const getForm = () => {
    document.getElementById("view").style.display="none";
    document.getElementById("form").style.display="block";
}

const resetForm = () => {
    document.getElementById("inputName").value="";
    document.getElementById("inputJob").value="";
    document.getElementById("view").style.display="block";
    document.getElementById("form").style.display="none";
}

const sendForm = async (event) => {
    event.preventDefault();
    document.getElementById("main").classList.remove("loaded");
    const name = document.getElementById("inputName").value;
    const job = document.getElementById("inputJob").value;

    if(name==="" || job===""){
        Swal.fire(
            'Por favor completa todos los campos',
            '',
            'warning'
          )
    }else{
        const user = {
            name ,
            job
        };
       
        const response = await registerUser(user);
        setTimeout(() => {
            Swal.fire('Registro exitoso!', `Nombre: ${response.name} <br>
            Puesto: ${response.job} <br>
            Fecha registro: ${new Date(response.createdAt).toLocaleDateString()}`, 'success');
            resetForm();
            document.getElementById("main").classList.add("loaded");
            
        }, 1000);
    }
    
}



start()






