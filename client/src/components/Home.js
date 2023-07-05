import React from "react";
import { Button, Paper, Typography } from "@mui/material";


function Home() {
    const log = localStorage.getItem('loggedIn');
    const logged = log === 'yes';
    const a = async() => {
        let user = {
            nickname: "Alexey", password: "123", phone: "555333",role:"1",name:"Алексей",surname:"Алексеев",address:null,darktheme:"false"
          };
          
          let response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
          });
          
          let result = await response.json();
          alert(result.message);
        /*fetch('http://localhost:8080/api/auth/register', {
            method: 'post',
            
        })*/
    }
    return(
        
            <Paper>
                {logged ? <Typography>1</Typography>:<Typography>2</Typography>}
                <Button onClick={a}>тык</Button>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>

                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>

                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>
                <h1>hello World</h1>

                <h1>hello World</h1>
                <h1>hello World</h1>
            </Paper>
     
    );
}

export default Home;