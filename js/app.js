const credentials = 'YjU3ODAzODUtNWVmMi00NjUzLTljNGYtYzUzMDEwZGM4MGQyOmYwZTZlYjZkODM1YzNmOTFiNTEzMjBjMjdhMGQ3YTlh';
var access_token = '';

var progress = 0;
function move() {
  if (progress == 0) {
    progress = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        progress = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

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

    fetch("https://api.projectcor.com/v1/oauth/token?grant_type=client_credentials", requestOptions)
    .then(response => {
        response.json()
        .then(result => {
            access_token = result.access_token;
            consumo();
        })
        .catch(error => console.log('error', error))
    })
    .catch(error => console.log('error', error))
}

access();

function consumo(){
  //let mod = ['contacts', 'clients', 'projects', 'brands', 'products', 'projectTemplates', 'tasks', 'hours', 'users'];
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
                //console.log(result);
                listar(result.lastPage, modulo, result.total);
            })
            .catch(error => console.log('error', error))
        })  
        .catch(error => console.log('error', error))
    });
    
}



function listar(lastPage, modulo, total){
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
                //dataList[a] = result.data;
                //a++;
                
                for (const iterator of result.data) {
                    //console.log(iterator)
                    dataList[a] = iterator;
                    a++;
                }

                if(a >= total){
                    console.log(dataList);
                    /*
                    dataList.forEach(item => {
                        console.log(item);
                    })
                    */
                    move();
                }

                //console.log(access_token)
            })
            .catch(error => {
                console.log('Error JSON: ', error);
                location.reload();
            }) 
        })  
        .catch(error => console.log('Error conexión: ', error));
        x++;
    }
    
}

