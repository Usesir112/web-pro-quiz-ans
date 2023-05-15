# Web Programming Quiz

### ข้อควรระวัง !

1. <span style="color:red">ห้ามเปลี่ยนชื่อทุกโฟลเดอร์</span>
2. <span style="color:red">ไม่ควรแก้ไขไฟล์ภายในโฟลเดอร์ `_test_`</span>
3. <span style="color:red">ห้ามแก้ไขไฟล์ `server.js`</span>
4. <span style="color:red">ไฟล์ `database.js` ในโฟลเดอร์ `config` สามารถแก้ไขได้ _แต่ห้ามเปลี่ยนชื่อไฟล์ หรือนำไฟล์ออกจากโฟลเดอร์_</span>
5. <span style="color:red">ให้ zip ไฟล์ภายในโฟลเดอร์ `todo`</span>
6. <span style="color:red">ให้ทำการ `zip` โปรเจคก่อน upload เท่านั้น _ห้ามใช้ วิธีอื่นเช่น RAR, RAR4_ </span>
7. <span style="color:red">ระบบสามารถ upload ได้แค่ `.zip` ไฟล์</span>
8. <span style="color:red">ห้าม zip โปรเจคที่ยังมี `node_modules` เพราะจะไม่สามารถ upload ไฟล์ได้</span>

## 1. To Do app

จงแก้ไข API ของเว็บไซต์สำหรับจัดการ ToDo List

### ขั้นตอนการ setup โปรเจค

1. ดาวน์โหลดไฟล์ของโปรเจคที่แนบมาให้ และแตกไฟล์ออกมา
2. เข้าไปในโฟลเดอร์ `quiz-2-65-code-main`
3. สร้าง database ชื่อ `todo`
4. ทำการรัน sql script `todo.sql` ที่ให้มา
5. เข้าไปในโฟลเดอร์ `quiz-2-6-code-main\todo\config`
6. แก้ไขไฟล์ `database.js`ให้มีค่าตรงกับ database ในเครื่อง
7. ใช้คำสั่งด้านล่าง เพื่อติดตั้ง dependencies ที่เกี่ยวข้อง

```
> npm install
```

8. ใช้คำสั่งด้านล่าง เพื่อ start web server

```
> npm run serve
```

9. ทดลองใช้งานโดยยิง GET request ไปที่ `http://localhost:3000/todo/1/` โดยถ้า API ใช้งานได้จะได้รับ response เป็น JSON ข้อมูล todo ที่มี id = 1

<br/>
### ตาราง todo

| Column Name | Data Type |
| ----------- | :-------: |
| id (PK)     |    INT    |
| title       |  VARCHAR  |
| description |   TEXT    |
| due_date    |   DATE    |
| order       |    INT    |
