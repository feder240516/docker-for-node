var mysql = require('mysql')
var mysql2 = require('mysql2/promise')

var con //= await mysql2.createConnection();

async function initDb(){
  if (!con) {
    let host;
    
    con = mysql2.createPool({
      host: "10.3.2.4",
      user: "callatealexa",
      password: "Madur0Castr0@",
      port: 3306,
      database: 'todoapp',
      connectionLimit:10,
      queueLimit: 0
    })    
    con.on('error',(err)=>{
      // con = null;
    })
    
    console.log('Connected to MySQL')
    
  
  }
}

initDb()/*.catch(err=>{
  console.error('Error connecting')
  console.error(err)
  let timeout;
  timeout = setTimeout(async ()=>{
    initDb()
  },10000)
  // console.error(err);
  // process.exit(1);
});*/

async function getPosts(category){
  let result;
  
  if(category){
    result = await con.query('SELECT * FROM Posts WHERE categoryId = ?', [category])
  }else{
    result = await con.query('SELECT * FROM Posts;')
  }
  // console.log(`Got data: ${JSON.stringify(result[0])}`)
  return result[0];
}

async function createPost(name){
  // console.log(`create post ${name}`)
  let result = await con.query('INSERT INTO Posts SET name=?',[name])
  // console.log(`got result ${JSON.stringify(result)}`)
  return result[0].insertId;
}

async function updatePost(id,name){
  // console.log(`${name} and ${id}`)
  return con.query(`UPDATE Posts SET name=? WHERE id=?`, [name,id])
}

async function deletePost(id){
  return con.query(`DELETE FROM Posts where id=?`,[id])
}

async function getCategories(){
  con.query('SELECT * FROM Categories;')
}

async function createCategory(name){
  con.query(`INSERT INTO Posts VALUES (${name})`)
}

async function updateCategory(id){
  con.query(`INSERT INTO posts VALUES (${name})`)
}

async function deleteCategory(id){
  con.query(`INSERT INTO posts VALUES (${name})`)
}



module.exports = {getPosts,createPost,updatePost,deletePost,
                  getCategories,createCategory,updateCategory,deleteCategory,}