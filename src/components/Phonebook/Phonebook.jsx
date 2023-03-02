import { useSelector, useDispatch } from 'react-redux';

import ContactList from './ContactList/ContactList';
import ContactFilter from './ContactFilter/ContactFilter';
import ContactForm from './ContactForm/ContactForm';

import { addContact, deleteContact } from 'redux/contacts-slice';
import { getFilteredContacts, getContacts } from 'redux/selectors';

import styles from '../Phonebook/phonebook.module.scss';

const Phonebook = () => {
  const filteredContact = useSelector(getFilteredContacts);
  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();

  const checkDuplicate = name => {
    const normalizeName = name.toLowerCase();
    const contactName = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizeName;
    });
    return Boolean(contactName);
  };

  const handleAddContact = ({ name, number }) => {
    if (checkDuplicate(name)) {
      return alert(`${name} is already in contacts`);
    }

    dispatch(addContact({ name, number }));
  };

  const handledeleteContact = id => {
    dispatch(deleteContact(id));
  };

  // const handleFilter = ({ target }) => dispatch(setFilter(target.value));

  const isContacts = Boolean(filteredContact.length);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <h2 className={styles.title}>Contacts</h2>
      <ContactFilter />
      <ContactList
        deleteContact={handledeleteContact}
        contacts={filteredContact}
      />
      {!isContacts && <p>No contacts in your phonebook!</p>}
    </div>
  );
};

export default Phonebook;
