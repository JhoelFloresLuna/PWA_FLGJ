'use strict'

const listUsers = async() => {
    try {
       fetch('https://reqres.in/api/users?page=2').then(res =>res.json())
        .then(res => {
            const {data} = res
            console.log(data);
        });
    } catch (error) {
        throw 'Ocurrio un error'
    }
}
listUsers();


