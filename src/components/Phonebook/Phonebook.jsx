import { useSelector, useDispatch } from 'react-redux';

import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';

import { addContact, removeContact } from 'redux/contacts/contacts-slice';
import { setFilter } from 'redux/filter/filter-slice';
import {
  getFilteredContacts,
  getAllContacts,
} from 'redux/contacts/contacts-selectors';
import { getFilter } from 'redux/filter/filter-selectors';

import styles from '../Phonebook/phonebook.module.scss';

const Phonebook = () => {
  const filteredContact = useSelector(getFilteredContacts);
  const filter = useSelector(getFilter);
  const getContacts = useSelector(getAllContacts);

  const dispatch = useDispatch();

  const checkDuplicate = name => {
    const normalizeName = name.toLowerCase();
    const contactName = getContacts.find(({ name }) => {
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

  const handleRemoveContact = id => {
    dispatch(removeContact(id));
  };

  const handleFilter = ({ target }) => dispatch(setFilter(target.value));

  const isContacts = Boolean(filteredContact.length);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <h2 className={styles.title}>Contacts</h2>
      <Filter handleChange={handleFilter} filter={filter} />
      <ContactList
        removeContact={handleRemoveContact}
        contacts={filteredContact}
      />
      {!isContacts && <p>No contacts in your phonebook!</p>}
    </div>
  );
};

export default Phonebook;
