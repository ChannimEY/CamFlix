const BASE_URL =
'http://laravel-auth-api-opal.vercel.app/api';

export const registerUser =
async (
name:string,
email:string,
password:string
)=>{

try{

const response=
await fetch(
`${BASE_URL}/register`,
{
method:'POST',

headers:{
'Content-Type':
'application/json',
'Accept':
'application/json'
},

body:
JSON.stringify({

name,
email,
password,
password_confirmation:
password

})

}
);

const data=
await response.json();

return data;

}

catch(error){

console.log(error);

return null;

}

};