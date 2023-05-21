import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { motion } from "framer-motion";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ButtonSecondary from '../buttons/ButtonSecondary';
import EyeOpen from '../../public/assets/employees/EyeOpen';
import EyeHidden from '../../public/assets/employees/EyeHidden';
import { Input } from "@mui/material";

import { firebaseError, validateEmail } from "../../lib/helpers";


import { useAuth } from "../../context/AuthContext";
import { collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import moment from "moment/moment";

import EditPen from "../../public/assets/editor/EditPen"
import CheckMark from '../../public/assets/general/CheckMark';
import TrashBin from '../../public/assets/editor/TrashBin';

const columns = [
  { id: 'name', label: 'Meno', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  {
    id: 'password',
    label: 'Heslo',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right',
  },
];

const fetchImageData = async (name) => {
    try {
      const imageUrl = `https://ui-avatars.com/api/?name=${name}&size=32&rounded=true&background=random`;
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      });
      const imageBuffer = Buffer.from(response.data, 'binary');
      const base64Image = imageBuffer.toString('base64');
      return base64Image;
    } catch (error) {
      console.error('Error downloading the image:', error);
      return null;
    }
  };


  const generateRowsWithImages = async (rows) => {
    const modifiedRows = [];
  
    for (const row of rows) {
      const { name, email, password, status } = row;
      const img = await fetchImageData(name);
      modifiedRows.push({ name, email, password, status, img });
    }
  
    return modifiedRows;
  };

var rows = [
    {
        name: 'Lukáš Výbošťok',
        email: 'lukas.vybostok@gmail.com',
        password: '123456',
        status: 'Aktívny',
        img: ''
    },
    {
        name: 'Peter Kosier',
        email: 'lukas.vybostok@gmail.com',
        password: 'HBLukasVybostok',
        status: 'Aktívny',
        img: ""
    },
    {
        name: 'Emanuel Bacigala',
        email: 'lukas.vybostok@gmail.com',
        password: 'HBJozkoMrkva',
        status: 'Aktívny',
        img: ""
    },
    {
        name: 'Jaro Gereg',
        email: 'lukas.vybostok@gmail.com',
        password: 'HBSomarDoma',
        status: 'Aktívny',
        img: ""
    },
    {
        name: 'Miško Jágrik',
        email: 'lukas.vybostok@gmail.com',
        password: 'dadadad67a6d4ada6',
        status: 'Aktívny',
        img: ""
    },
    {
        name: 'Adrián Hochla',
        email: 'lukas.vybostok@gmail.com',
        password: 'aaaaaa',
        status: 'Aktívny',
        img: ""
    },{
        name: 'Adrián Hochla',
        email: 'lukas.vybostok@gmail.com',
        password: 'aaaaaa',
        status: 'Aktívny',
        img: ""
    },{
        name: 'Adrián Hochla',
        email: 'lukas.vybostok@gmail.com',
        password: 'aaaaaa',
        status: 'Aktívny',
        img: ""
    },{
        name: 'Adrián Hochla',
        email: 'lukas.vybostok@gmail.com',
        password: 'aaaaaa',
        status: 'Aktívny',
        img: ""
    },
]


export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [addemployee, setaddemployee] = useState(false);

  const { employees, setEmployees } = useAuth()

//   useEffect(() => {

//     generateRowsWithImages(rows)
//     .then(modifiedRows => {
//         rows = modifiedRows;
//         console.log(modifiedRows)
//         setEmployeeData(modifiedRows)
//         setpasswords(Array(modifiedRows.length).fill(false))
//         sethovered(Array(modifiedRows.length).fill(false))
//     })
//     .catch(error => {
//         console.error('Error generating rows with images:', error);
//     });

//   }, [])
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {employees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,ix) => <CustomTableRow row={row} columns={columns} ix={ix} employees={employees} setEmployees={setEmployees}/>)}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='flex justify-between items-center'>

        <ButtonSecondary className={"ml-1 h-8 opacity-50"} onClick={() => setaddemployee(!addemployee)}>
            Pridať zamestanca
        </ButtonSecondary>

        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={employees.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </Paper>

    {addemployee && <AddEmployee set={setaddemployee} employees={employees} setEmployees={setEmployees}/>}

   </>
  );
}

function CustomTableRow({row, columns, ix, employees, setEmployees}){

    const [showpass, setshowpass] = useState(false)
    const [nameHovered, setNameHovered] = useState(false)
    const [emailHovered, setEmailHovered] = useState(false)
    const [passHovered, setPassHovered] = useState(false)
    const [statusHovered, setStatusHovered] = useState(false)
    const [nameEdit, setNameEdit] = useState(false)
    const [emailEdit, setEmailEdit] = useState(false)
    const [passEdit, setPassEdit] = useState(false)
    const [statusEdit, setStatusEdit] = useState(false)
    
    const [employee, setEmployee] = useState(row)


    function handleMouseEnter(column){
        if(column.id === 'name') setNameHovered(true)
        if(column.id === 'email') setEmailHovered(true)
        if(column.id === 'password') setPassHovered(true)
        if(column.id === 'status') setStatusHovered(true)
    }

    function handleMouseLeave(column){
        if(column.id === 'name') setNameHovered(false)
        if(column.id === 'email') setEmailHovered(false)
        if(column.id === 'password') setPassHovered(false)
        if(column.id === 'status') setStatusHovered(false)
    }

    function changeVal(e, key){
        let newEmployee = {...employee}
        newEmployee[key] = e.target.value
        setEmployee(newEmployee)
    }

    function deleteEmployee(e){
        let newEmployees = [...employees]
        newEmployees.splice(ix, 1)
        setEmployees(newEmployees)

        const docRef = doc(firestore, `/employees/${employee.id}`);

		deleteDoc(docRef)
			.then((res) => { })
			.catch((err) => {
				console.log(err);
			});
    }

    return(
        <TableRow hover role="checkbox" tabIndex={-1} key={`TableRow${ix}`}>
            {columns.map((column, ix2) => {

                let cell = <></>

                if(column.id === 'name'){
                    cell = <div className='flex items-center gap-1'>
                    <img width={28} src={`data:image/png;base64,${row.img}`} alt="Avatar"/>

                    {!nameEdit?
                        <span>{employee[column.id]}</span>:
                        <Input onChange={(e) => changeVal(e, 'name')} style={{fontSize: 14, fontFamily: "poppins", width: "50%"}} defaultValue={employee[column.id]} />
                    }
                    

                    {!nameEdit && nameHovered? 
                        <div className='w-3  ml-1 cursor-pointer' onClick={() => setNameEdit(true)}><EditPen/></div> : 
                        <> {!nameEdit && <div className='w-4'></div>}</>
                    }

                    {nameEdit && 
                        <SubmitCheckMark setState={setNameEdit} newEmployee={employee} setEmployee={setEmployee}/>
                    }

                </div> 
                }

                if(column.id === 'email'){
                    cell = <div className='flex items-center gap-1'>
                        {!emailEdit?
                        <span>{employee[column.id]}</span>:
                        <Input onChange={(e) => changeVal(e, 'email')} style={{fontSize: 14, fontFamily: "poppins", width: "50%"}} defaultValue={employee[column.id]} />
                        }
                        
                        {emailHovered && !emailEdit?
                         <div className='w-3  ml-1 cursor-pointer' onClick={() => setEmailEdit(true)}><EditPen/></div>
                        : <div className='w-4'></div> }

                        {emailEdit && 
                            <SubmitCheckMark setState={setEmailEdit} newEmployee={employee} setEmployee={setEmployee}/>
                        }

    
                    </div>
                }

                if(column.id === 'password'){
                    cell = <div className='flex items-center justify-end gap-2'>
                        {passHovered && !showpass && !passEdit?
                        <div className='w-3  ml-1 cursor-pointer opacity-50' onClick={() => setPassEdit(true)}><EditPen/></div>
                        : <div className='w-4'></div> }
                        
                        {!passEdit?
                        <span style={!showpass?{textShadow: "0 0 10px black", color: "transparent", userSelect: "none"}:{}}>
                            {employee[column.id]}
                        </span>:
                        <Input onChange={(e) => changeVal(e, 'password')} style={{fontSize: 14, fontFamily: "poppins", width: "50%"}} defaultValue={employee[column.id]} />
                        }
                        
                        {!passEdit? 
                        <div onClick={() => setshowpass(!showpass)} className='cursor-pointer'>{showpass?<EyeOpen/>:<EyeHidden/>}</div>  
                        : <SubmitCheckMark setState={setPassEdit} newEmployee={employee} setEmployee={setEmployee}/>
                    } 
                   </div>
                    
                }

                if(column.id === 'status'){
                    cell = <div className='flex items-center justify-end gap-1'>
                        {statusHovered && !statusEdit?
                        <div className='w-3  ml-1 cursor-pointer' onClick={() => setStatusEdit(true)}><EditPen/></div>
                        : <div className='w-4'></div> }

                        {!statusEdit?
                        <div className='flex items-center gap-2'>
                            <span>{employee[column.id]}</span>
                            {statusHovered && <div onClick={deleteEmployee} className='cursor-pointer'><TrashBin color={'gray'}/></div>}
                        </div>
                        :
                        <Input onChange={(e) => changeVal(e, 'status')} style={{fontSize: 14, fontFamily: "poppins", width: "20%"}} defaultValue={employee[column.id]} />
                        }

                        {statusEdit && 
                            <SubmitCheckMark setState={setStatusEdit} newEmployee={employee} setEmployee={setEmployee}/>
                        }
                    </div>
                }

                return (
                <TableCell onMouseEnter={() => handleMouseEnter(column)} onMouseLeave={() => handleMouseLeave(column)} key={`C${ix}R${ix2}`} align={column.align}> 
                    {cell}
                </TableCell>
                );
            })}
            </TableRow>
    )
}

function SubmitCheckMark({setState, newEmployee, setEmployee}){

    const { updateEmployee } = useAuth()


    function handleClick(){
        setState(false)
        updateEmployee(newEmployee)
        setEmployee(newEmployee)
    }

    return(
        <div className='cursor-pointer' onClick={handleClick}><CheckMark scale={1.2}></CheckMark></div>
    )
}


function AddEmployee({set, employees, setEmployees}){
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const { user, createUser } = useAuth();

    async function handleAdd(){

      set(false)
      return


      const Email = email
      const pass = password

      firebaseError("");
      var newError = {
        name: "",
        email: "",
        password: "",
        firebaseError: "",
      };
      var errorExists = false;

      if (!Email) {
        newError.email = "Zadajte email";
        errorExists = true;
      } else if (!validateEmail(Email)) {
        newError.email = "Email v nesprávnom formáte";
        errorExists = true;
      }

      if (!pass) {
        newError.password = "Zadajte heslo";
        errorExists = true;
      }


      if (pass && pass.length < 6) {
        newError.password = "Heslo musí obsahovať aspoň 6 znakov";
        errorExists = true;
      }
      
      //seterror(newError);
      if (!errorExists) {

        let img = await fetchImageData(name);
        const newEmployee = {
          name: name,
          created: moment().valueOf(),
          userId: user != null ? user.uid : "none",
          email: Email,
          status: "Aktívny",
          img: img
        }

        createUserWithoutSignIn(Email, pass)
          .then((user) => {
            const docRef = doc(firestore, `/employees/${user.user.uid}`);

            setDoc(docRef, newEmployee)
              .then(() => {
                set(false)
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            newError.firebaseError = firebaseError(err.code);
            //seterror(newError);
            //setuserloading(false);
          });
      }

      else{
        console.log(newError)
      }


    }

    return(<motion.div
			key='generate-pdf'
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
			className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-[300] flex justify-center items-center'
		>
			<div className=' bg-white rounded-md py-6 px-8'>

				<div className='h-full w-full flex justify-center items-center gap-3'>
					<h2 className='font-light'>Pridať zamestnanca</h2>
				</div>
                
                <div className='flex flex-col gap-4 my-5'>
                    <Input onChange={(e) => setname(e.target.value)} placeholder='Meno a Priezvisko' required/>
                    <Input onChange={(e) => setemail(e.target.value)} placeholder='Prihlasovací Email' type='email' required/>
                    <Input onChange={(e) => setpassword(e.target.value)} placeholder='Prihlasovacie Heslo' type='password' required/>
                </div>

                <ButtonSecondary onClick={handleAdd}>
                        Pridať
                </ButtonSecondary>
			</div>
		</motion.div>
        )
}