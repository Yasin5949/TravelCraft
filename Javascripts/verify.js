function verify(){
    let form =document.getElementById('form');
    let formData=new FormData(form);
    fetch('../Backend/Verify.php',{
        method:"POST",
        body:formData
    }).then(response=>response.json())
    .then(data=>{
        if(data.misMatch){
            alert("Incorrect Code");
        }else if(data.Verified){
            window.location.href='Login.html';
        }
    })
}