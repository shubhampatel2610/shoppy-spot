import React from 'react';
import { observer } from 'mobx-react-lite';
import { Dropdown } from 'primereact/dropdown';

const NEW_SUFFIX = ' (new)';

// Category picker that doubles as a "create new category" input. Built on the same
// Dropdown component FormDropdownField uses elsewhere (editable mode) so it shares
// the exact same trigger icon and option spacing as every other dropdown in the app.
// Typing a name with no existing match appends a synthetic "<name> (new)" option;
// selecting it just sets the field's value to the plain name - the store resolves
// (and creates, if needed) the actual category record on save.
const CategoryComboField = observer((props) => {
  const { field, categoryNames } = props;

  const query = field.value.trim();
  const hasExactMatch = categoryNames.some((name) => name.toLowerCase() === query.toLowerCase());
  const matches = query
    ? categoryNames.filter((name) => name.toLowerCase().includes(query.toLowerCase()))
    : categoryNames;
  const options = query && !hasExactMatch ? [...matches, `${query}${NEW_SUFFIX}`] : matches;

  const handleChange = (e) => {
    const raw = e.value ?? '';
    const isNew = raw.endsWith(NEW_SUFFIX);
    field.setValue(isNew ? raw.slice(0, -NEW_SUFFIX.length) : raw);
  }

  const itemTemplate = (item) => {
    const isNew = item.endsWith(NEW_SUFFIX);
    return isNew ? (
      <span className="flex items-center gap-1.5 text-[#1e3a5f] font-medium">
        <i className="pi pi-plus-circle text-xs" />
        {item}
      </span>
    ) : (
      <span>{item}</span>
    );
  }

  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{field.label}</label>
      <Dropdown
        value={field.value}
        options={options}
        editable
        itemTemplate={itemTemplate}
        onChange={handleChange}
        onHide={() => field.validate()}
        placeholder={field.placeholder}
        className="w-full text-sm"
      />
      {field.error && <p className="text-xs text-red-500 mt-1">{field.error}</p>}
    </div>
  )
})

export default CategoryComboField;
