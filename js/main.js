const credentials = 'YjU3ODAzODUtNWVmMi00NjUzLTljNGYtYzUzMDEwZGM4MGQyOmYwZTZlYjZkODM1YzNmOTFiNTEzMjBjMjdhMGQ3YTlh';

function access(){
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `basic ${credentials}`);

    let formdata = new FormData();

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    let access_token;
    fetch("https://api.projectcor.com/v1/oauth/token?grant_type=client_credentials", requestOptions)
    .then(response => {
        response.json()
        .then(result => {
            access_token = result.access_token;
            consumo(access_token)
        })
        .catch(error => console.log('error', error))
    })
    .catch(error => console.log('error', error))
}

access();

//let mod = ['contacts', 'clients', 'projects', 'brands', 'products', 'projectTemplates', 'tasks', 'hours', 'users'];



function consumo(access_token){
    let mod = ['contacts', 'clients', 'projects', 'brands', 'products', 'tasks', 'hours', 'users'];
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${access_token}`);

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    
    mod.forEach(modulo => {

        fetch(`https://api.projectcor.com/v1/${modulo}`, requestOptions)
        .then(response => {
            response.json()
            .then(result => {
                console.log(result);
                listar(result.lastPage, modulo, access_token);
            })
            .catch(error => console.log('error', error))
        })  
        .catch(error => console.log('error', error))
    });
    
}



function listar(lastPage, modulo, access_token){
    let x = 1;
    let a = 0;
    let indexList = 0;
    let list = [];
    let dataList = [];

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${access_token}`);

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    
    while(x <= lastPage){

        fetch(`https://api.projectcor.com/v1/${modulo}?page=${x}`, requestOptions)
        .then(response => {
            response.json()
            .then(result => {
                //saveData(x, result.data);
                dataList[a] = result.data;
                a++;
            })
            .catch(error => console.log('error', error))
        })  
        .catch(error => console.log('error', error))

        x++;
    }

    if(x > lastPage){
        console.log(dataList);
    }

}



/*
function saveData(x, data){
    console.log(data)
}
*/
