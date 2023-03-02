export const getContacts = ({ contacts }) => contacts;

export const getFilteredContacts = ({ contacts, filter }) => {
  if (!filter) {
    return contacts;
  }
  const normalizeFilter = filter.toLowerCase();
  const result = contacts.filter(({ name }) => {
    return name.toLowerCase().includes(normalizeFilter);
  });
  return result;
};
export const getFilter = ({ filter }) => filter;
