import React, {useState, useEffect} from 'react';
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
import { Input, TextField } from "@mui/material";

import moment from 'moment/moment';

import { firebaseError, validateEmail } from "../../lib/helpers";

import { useAuth } from "../../context/AuthContext";
import { collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../lib/firebase";

import EditPen from "../../public/assets/editor/EditPen"
import CheckMark from '../../public/assets/general/CheckMark';
import TrashBin from '../../public/assets/editor/TrashBin';
import PopUp from '../general/PopUp';

const columns = [
  { id: 'name', label: 'Meno', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  {
    id: 'created',
    label: 'Registrácia',
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


export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [addemployee, setaddemployee] = useState(false);

  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const { employees, handleEmployeeAdd} = useAuth();


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <>
    <Paper sx={{ width: '100%', overflow: 'visible' }}>
      <TableContainer sx={{ maxHeight: 440 }} className='overflow-visible'>
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
              .map((employee,ix) => {

                return(
                <TableRow hover role="checkbox" tabIndex={-1} key={`TableRow${ix}`}>
                    {columns.map((column, ix2) => {


                      return(
                      <TableCell key={`C${ix}R${ix2}`} align={column.align}> 


                          {column.id === 'name'? <div className='flex items-center gap-1'>
                              <img width={28} src={`data:image/png;base64,${employee.img}`} alt="Avatar"/>
                              <span> { employee[column.id] } </span>
                          </div>:

                          <span>
                            {column.id === 'created'? moment(employee[column.id]).format("DD.MM. YYYY") : employee[column.id]}
                          </span>
                          }


                      </TableCell>)
                    })}

                </TableRow>)

              })}
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

    <AddEmployee open={addemployee} setOpen={setaddemployee}/>

   </>
  );
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


function AddEmployee({ setOpen, open }){

  const vyhody = [
    'Sledujte dochádzku zamestnancov',
    'Trackujte lokáciu pre lepší preľad',
    'Spolupracujte na tímových procesoch',
    'Uploadujte fotky na vytvorené stavby',
    'Digitalizujte svoj stavebný biznis',
    'A mnoho ďalšieho...'
  ]

  return(
    <PopUp setOpen={setOpen} open={open}>

      <div className='flex gap-10'>

        <EmployeeValidation/>

          <div className=' pr-20 pl-10 font-light text-lg '>
            <span className='text-3xl font-semibold'> Zjednodušte si život, </span>
            <br/>
            <span className='text-3xl font-semibold'> vytvorte transparentnosť </span>

            <div className='flex flex-col gap-2 mt-6 pb-6 '>
            {vyhody.map(vyhoda => {
              return(
                <div className='flex gap-3' key={vyhoda}>
                  <CheckMark scale={1.5}/>
                  <span> {vyhoda} </span>
                </div>
              )
            })}
            </div>

            
            <span> Po vytvorení príde Vašemu zamestnancovi  </span>
            <br/>
            <span>email s prihlasovacími údajmi.</span>

          </div>

      </div>

    </PopUp>
  )
}


function EmployeeValidation(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerfiyPassword] = useState('');
  const [error, setError] = useState('');

  const { handleEmployeeAdd} = useAuth();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
  }

  function handleSubmit(event){
    event.preventDefault();

    if (!validateEmail(email)) {
      setError('Neplatný email');
      return;
    }

    if (password.length < 6) {
      setError('Heslo musí obsahovať aspoň 6 znakov');
      return;
    }

    if (password !== verifyPassword){
      setError('Heslá sa nezhodujú');
      return;
    }

    handleEmployeeAdd(name, email, password, setError)

    // Clear error and perform login...
    setError('');

  }


  return(
    <div>
      <div className='text-3xl font-semibold'>Pridať Zamestnanca</div>
      <form onSubmit={handleSubmit} className='ml-1'>
        <div className='flex flex-col gap-4 my-5'>

            <TextField 
              label='Meno a Priezvisko'
              type='text' 
              value={name} 
              onChange={e => setName(e.target.value)}
              autoComplete='name' 
              required   
            />

            <TextField 
              label='Prihlasovací Email' 
              type='email' 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              required
            />

            <TextField 
              label='Prihlasovacie Heslo' 
              type='password' 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            <TextField 
              label="Heslo znova" 
              type="password" 
              value={verifyPassword}
              onChange={e => setVerfiyPassword(e.target.value)}
              required
            />

        </div>

        {error && <p>*{error}</p>}
          
        <button>
          <ButtonSecondary type={"submit"}>
                Pridať
          </ButtonSecondary>
        </button>

      </form>
    </div>
  )
}


