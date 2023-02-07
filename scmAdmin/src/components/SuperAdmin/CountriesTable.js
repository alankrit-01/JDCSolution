import { Button } from "@material-tailwind/react";
import axios from "axios";
import Input from '@material-tailwind/react/Input';
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
const CountriesTable = () => {
    const[Countries,setCountries] = useState([]);
    const[Search,setSearch] = useState("");
    const[FilterCountries,setFilterCountries] = useState([]);

    const getCountries = async () => {
        try{
            const response = await axios.get("https://restcountries.com/v2/all");
            setCountries(response.data)
            setFilterCountries(response.data)
        }catch(error){
            console.error();
        }
    };
    const columns = [
        {
            name:"Country Name",
            selector:(row) => row.name,
            sortable:true,
        },
        {
            name:"Country Native Name",
            selector:(row) => row.nativeName,
        },
        {
            name:"Country Capital",
            selector:(row) => row.capital,
        },
        {
            name:"Country Flag",
            selector:(row) => <img width={50} height={50} src={row.flag}/>,
        },
    ];
    useEffect(() => {
        getCountries();
    }, []);

    useEffect(() =>{
        const result = Countries.filter((country) => {
            return country.name.toLowerCase().match(Search.toLowerCase());
        })
        setFilterCountries(result)
    },[Search]) 

    return(
        <DataTable
        title="Factory List"
        columns={columns} 
        data={FilterCountries}
        pagination
        fixedHeader
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        actions={<NavLink
            to="/admin/addfactory"
            className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
            activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
        ><Button>Add</Button></NavLink>}
        subHeader
        subHeaderComponent={
            <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                <Input type="text" color="purple" placeholder="Search Here" value={Search} onChange={(e) => setSearch(e.target.value)} />
            </div>
        }
        />
    );
}
export default CountriesTable