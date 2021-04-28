import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import CreateData from "./createData";
import DataLists from "./dataList";
import { getContact, getContacts, postUser, patchUser, deleteUser } from '../services'
import { useDispatch, useSelector } from "react-redux";
import { addDataUser, removeDataUser, setDataUser } from "../redux/action"

const Crud = () => {
    const dispatch = useDispatch();
    const addUserReducer = useSelector(state => state.addUserReducer)

    const [contactList, setcontactList] = useState([])
    const [isEditing, setisEditing] = useState(false)

    const serviceListContacts = async () => {
        const response = await getContacts();
        setcontactList(response.data.reverse())
    }

    useEffect(() => {
        serviceListContacts()
    }, [])

    const handleChange = (e => {
        const { name, value } = e.target;
        dispatch(addDataUser({name, value}))
    })

    const addData = async (e) => {
        e.preventDefault();
        let { id, firstName, lastName, age, photo  } = addUserReducer;
        if (!firstName || !lastName || !age) return;

        if(!photo){
            photo = "N/A";
        }

        const payload = Object.assign({}, { firstName, lastName, age, photo });
        if(id) {
            await patchUser(id, payload);
        } else{
            await postUser(payload);
        }

        serviceListContacts();
        reset();
    };

    const handleUpdate = async (e, id) => {
        const contact = await getContact(id);
        dispatch(setDataUser(contact.data));
        setisEditing(true);
    }

    
    const requestDelete =  (id) => {
        return confirmAlert({
            title: "Confirm to delete.",
            message: "Are you sure to do this?",
            buttons: [
                {
                  label: 'Cancel',
                  onClick: () => {}
                },
                {
                  label: 'OK',
                  onClick: async() => await removeData(id)
                }
              ]

        })
    }

    const requetSubmit =  (e) => {
        e.preventDefault()
        return confirmAlert({
            title: "Confirm to submit.",
            message: "Are you sure to do this?",
            buttons: [
                {
                    label: 'Cancel',
                    onClick: () => console.log("canceled")
                },
                {
                    label: 'OK',
                    onClick: () => addData(e)
                }
            ]
        })
    }

    const removeData = async (id) => {
        await deleteUser(id);
        serviceListContacts();
    }

    const reset = () => {
        dispatch(removeDataUser());
        setisEditing(false);
    }

    

    return (
        <Grid container spacing={1}>
            <Grid item ls={6} md={6} sm={12} xs={12}>
                <CreateData
                    addData={e => requetSubmit(e)}
                    handleChange={handleChange}
                    isEditing={isEditing}
                />
            </Grid>
            <Grid item ls={6} md={6} sm={12} xs={12}>
                <DataLists
                    lists={contactList}
                    removeData={requestDelete}
                    handleUpdate={handleUpdate}
                />
          </Grid>
        </Grid>
      );
}

export default Crud