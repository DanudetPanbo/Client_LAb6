let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let students = [{'id':0,'name':'Somchai', 'surname': 'Khemklad', 'Major': 'CoE', 'GPA': 3.32},
   {'id':1, 'name':'Yaya','surname': 'Rakngam', 'Major': 'SE', 'GPA': 3}
];

let studentIndex=2;

router.route('/students')
   // get all bears
   .get( (req, res) =>  res.json(students) ) 

   // insert a new student
   .post( (req, res)=> {
       var bear = {};
       student.id =  studentIndex++;
       student.name = req.body.name
       student.surname = req.body.surname
       student.Major = req.body.Major
       student.GPA = req.body.GPA
       students.push(student);
       res.json( {message: 'Student created!'} )
   })

   router.route('/students/:student_id')
   .get ( (req,res) => res.json(students[req.params.student_id]))  // get a student

   .put ( (req,res) => {                               // Update a student
       var id = req.params.student_id
       students[id].name = req.body.name;   
       students[id].weight = req.body.weight; 
       students[id].surname = req.body.surname
       students[id].Major = req.body.Major
       students[id].GPA = req.body.GPA  
       res.json({ message: 'Student updated!' + req.params.student_id});
   })

   .delete ( (req,res) => {                   // Delete a student
       delete     students[req.params.student_id]
       res.json({ message: 'Student deleted: ' + req.params.student_id});
   })



router.route('/students').get((req, res) =>  res.json(students) );

app.use("*", (req,res) => res.status(404).send('404 Not found') );
app.listen(8000,  () => console.log("Server is running") );