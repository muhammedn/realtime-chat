const path = require('path');
const express = require('express');

const app = express();


// Setting static folders
app.use(express.static(path.join(__dirname,'public')));



const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=>{
    console.log(`Server started on port : ${PORT}`);
});