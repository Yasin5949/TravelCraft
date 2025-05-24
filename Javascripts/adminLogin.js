function login(){
    let form=document.getElementById('form');
    let formData=new FormData(form);
    fetch('../Backend/admin.php',{
        method:"POST",
        body:formData
    })
    .then(response=>{
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
    .then(data=>{
        if(data.loggedIn){
            window.location.href='adminDashBoard.html';
        }else if(data.message){
            document.querySelectorAll('.imageContainer').forEach(mode=>{
                mode.style.background="red";
            })
        }else{
            alert("error");
        }
    })
}
function showPassword(){
    let password=document.getElementById('password');
    let show=document.querySelectorAll('.name');
    let pass=document.querySelectorAll('.imageContainer');
    if(password.type === "password"){
        password.type='text';
        show[1].classList.add('password');
        pass[1].classList.add('password');
    }else{
        password.type='password';
        show[1].classList.remove('password');
        pass[1].classList.remove('password');
    }
}