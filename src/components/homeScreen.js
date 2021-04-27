import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getContacts } from '../services'

const ContactList = () => {
    const [contactList, setcontactList] = useState([])

    const serviceListContacts = async () => {
        const response = await getContacts();
        setcontactList(response.data)
    }

    useEffect(() => {
        serviceListContacts()
    }, [])

    return(
        <div className={"list-wrapper"}>
          {contactList.map(el => {
            return(
              <div className={"contact-item"} key={el.id}>
                <p>{el.firstName}</p>
                <Link to={`/contact/${el.id}`}>View</Link>
              </div>
            )
          })}
        </div>
    )
}

export default ContactList