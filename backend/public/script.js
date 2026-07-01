

async function register(){
    console.log("Button clicked");
    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;

    const response=await fetch(
        "http://localhost:5000/api/auth/register",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(
                {
                    name,
                    email,
                    password})
                }
            );
    console.log("Status:", response.status);

    const data = await response.json();

    console.log(data);

    document.getElementById("message").innerText =
        data.message || "Success";
}