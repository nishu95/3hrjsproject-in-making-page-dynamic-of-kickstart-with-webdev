var form=document.getElementById('form');
form.addEventListener('submit',addlocal);

function addlocal(e){
    e.preventDefault();
    var price=document.getElementById('price').value;
    var dish=document.getElementById('dish').value;
    var table=document.getElementById('table').value;

    const object={
        price,
        dish,
        table
    };

    axios.post("https://crudcrud.com/api/4136a410692e4f9e8e311f3f0c4781c2/restrauntData",object)
        .then((response)=>{
            console.log(response);
            showOnScreen(response.data);
        })
        .catch((err)=>{
            document.body.innerHTML=document.body.innerHTML+"<h4> SOMETHING WENT WRONG </h4>";
            console.log(err);
        });

        console.log("inside addlocal function");

    document.getElementById('price').value=' ';
    document.getElementById('dish').value=' ';
    document.getElementById('table').value=' ';
}


function showOnScreen(obj){
    console.log("create new order for table");
    if(obj.table==1){
        const parentNode=document.getElementById("t1");
        const childNode=`<li id="${obj._id}">${obj.price} - ${obj.dish} - table 1
                            <button onclick="deleteUser('${obj._id}')">DELETE</button>
                            </li>`
        parentNode.innerHTML=parentNode.innerHTML+childNode;
    }
    if(obj.table==2){
        const parentNode=document.getElementById("t2");
        const childNode=`<li id="${obj._id}">${obj.price} - ${obj.dish} - table 2
                            <button onclick="deleteUser('${obj._id}')">DELETE</button>
                            </li>`
        parentNode.innerHTML=parentNode.innerHTML+childNode;
    }
    if(obj.table==3){
        const parentNode=document.getElementById("t3");
        const childNode=`<li id="${obj._id}">${obj.price} - ${obj.dish} - table 3
                            <button onclick="deleteUser('${obj._id}')">DELETE</button>
                            </li>`
        parentNode.innerHTML=parentNode.innerHTML+childNode;
    }
    
}

function deleteUser(userId){
    console.log(userId);
    axios.delete(`https://crudcrud.com/api/4136a410692e4f9e8e311f3f0c4781c2/restrauntData/${userId}`)
        .then((response)=>{
            console.log(response);
            console.log("deleted data now doing ux change");
            removeUser(userId); 
        })
        .catch((err)=>{
            document.body.innerHTML=document.body.innerHTML+"<h4> SOMETHING WENT WRONG </h4>";
            console.log(err);
        });
}

 function removeUser(userId){
    console.log("removing list from screen");
    const nodetoremove=document.getElementById(userId);
    console.log(nodetoremove);
    parentid=nodetoremove.parentNode.id;
    
    const parent_node=document.getElementById(parentid);
    if(nodetoremove){
        parent_node.removeChild(nodetoremove);
    }
    
        
}

document.addEventListener('DOMContentLoaded',refresh);
function refresh(e){
    e.preventDefault();
    console.log("refresh happened");
    axios.get("https://crudcrud.com/api/4136a410692e4f9e8e311f3f0c4781c2/restrauntData")
        .then((response)=>{
            console.log(response.data);
            for(var i=0;i<response.data.length;i++){
                showOnScreen(response.data[i]);
            }
        })
        .catch((err)=>{
            console.log(err);
        });
}