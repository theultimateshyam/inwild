async function getdata(){
    await axios.get('/stats',{
    }).then(response => {
      var arr=response.data;
      num_animal.innerText += arr[0];
      num_animalcat.innerText += arr[1];
      num_reporters.innerText += arr[2];
      num_users.innerText += arr[3];
    })
    .catch(err=>{
      console.log(err);
    })
    
  }