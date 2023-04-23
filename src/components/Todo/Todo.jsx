import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line, RiSave3Line } from 'react-icons/ri';
import { useState } from 'react';

export const Todo = ({ description, index, id, onDelete, onUpdate }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.currentTarget.value);
  };
  const handleClickBtn = () => {
    setIsEdit(prevState => !prevState);
    if (isEdit) {
      onUpdate(value, id);
    } else {
      setValue(description);
    }
  };
  return (
    <TodoWrapper>
      <Text textAlign="center" marginBottom="20px">
        TODO #{index + 1}
      </Text>
      {isEdit ? (
        <input value={value} onChange={handleChange} />
      ) : (
        <Text>{description}</Text>
      )}
      <DeleteButton
        type="button"
        onClick={() => {
          onDelete(id);
        }}
      >
        <RiDeleteBinLine size={24} />
      </DeleteButton>
      <EditButton type="button" onClick={handleClickBtn}>
        {isEdit ? <RiSave3Line size={24} /> : <RiEdit2Line size={24} />}
      </EditButton>
    </TodoWrapper>
  );
};
