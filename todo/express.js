const express = require('express')
const app = express()
const port = 3000

const pool = require("./config/database")
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 

app.get('/todo', async(req, res, next) => {
  const start = req.body.start_date
  const end = req.body.end_date
  try {
    if (start != null && end != null){
      const [data, bae] = await pool.query("SELECT *, DATE_FORMAT(due_date, '%Y-%m-%d') as due_date from todo WHERE due_date >= ? and due_date <= ?", [start, end])
      res.status(200).json(data) 
    }
    else{
      const [data, bae] = await pool.query("SELECT *, DATE_FORMAT(due_date, '%Y-%m-%d') as due_date from todo", [])
      res.status(200).json(data) 
    }
    
  } catch (er) {
    console.log(er)
    next(er)
  }
})

app.post('/todo', async(req, res, next) => {
  // ข้อนี้ให้ส่งแบบ post เพื่อเพิ่ม todo ลง database
  // โจทย์ คือจะส่ง ค่ามาแบบ body โดยมี title , description, due_date 
  // req.body คือรับค่ามาจาก body ที่ส่ง raw json แบบ postman  
  const title = req.body.title // อันนี้คือรับค่า value title
  const description = req.body.description
  var due_date = req.body.due_date
  if (due_date == null){
    due_date = new Date()
  }
  console.log(due_date)
  if (!title){ // โจทย์ ถ้าไม่มีการส่งค่า title หรือ เป็นค่าว่าง ก็ให้ respond กลับแบบนี้ให้กรอก
    res.status(400).json({message: "ต้องกรอก title"})
  }
  else if (!description){ // โจทย์ ถ้าไม่มีการส่งค่า description หรือ เป็นค่าว่าง ก็ให้ respond กลับแบบนี้ให้กรอก
    res.status(400).json({message: "ต้องกรอก description"})
  }
  else{
    try {
      // ในฐานข้อมูลจะมี title, description, due_date, order 
      // เลข order ของ todo นี้ คือ เลข order ที่มากที่สุดแล้วบวก 1 
      const [getNumOrder, testei] = await pool.query("SELECT MAX(`order`) as yerhsut from todo") 
      console.log(getNumOrder)
      console.log(getNumOrder[0])
      console.log(getNumOrder[0].yerhsut)
      // ก็เลยหาค่า max ที่สูงที่สุด แล้วค่อย +1
      const numOrder = getNumOrder[0].yerhsut+1
      const [rows, fields] = await pool.query("INSERT INTO todo (title, description, due_date, `order`) VALUES (?, ?, ?, ?)", [title, description, due_date, numOrder ])
      const [data, bae] = await pool.query("SELECT *, DATE_FORMAT(due_date, '%Y-%m-%d') as due_date from todo where id = ?", [rows.insertId]) 
      res.status(201).json({message: `สร้าง ToDo '${ title }' สำเร็จ`, todo: data[0]})
    } catch (er) {
      console.log(er)
      next(er)
    }
  }
})

app.get('/todo/:id', async (req, res, next) => {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM todo WHERE id=?", [req.params.id])
    res.json(rows[0])
  } catch (err) {
    console.log(err)
    next(err)
  }
})

app.delete('/todo/:id', async(req, res, next) => {
  const [getData, fds] = await pool.query("select * from todo where id=?", [req.params.id])
  try {
    if (!getData[0]){
      res.status(404).json({message : "ไม่พบ ToDo ที่ต้องการลบ"})
    }
    else{
      const [rows, fields] = await pool.query("DELETE FROM todo where id=?", [req.params.id])
      res.status(200).json({message:`ลบ ToDo '${getData[0].title}' สำเร็จ`})
    }
    
  } catch (er) {
    console.log(er)
    next(er)
  }
})

module.exports = app