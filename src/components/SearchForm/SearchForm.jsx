// import { Component } from 'react';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';
// import { SearchForm } from 'components';

export const SearchForm = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleInput = event => {
    setValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(value);
    setValue('');
  };

  return (
    <SearchFormStyled onSubmit={handleSubmit}>
      <FormBtn type="submit">
        <FiSearch size="16px" />
      </FormBtn>
      <InputSearch
        placeholder="What do you want to write?"
        name="search"
        required
        autoFocus
        value={value}
        onChange={handleInput}
      />
    </SearchFormStyled>
  );
};

// export class SearchForm extends Component {
//   state = {
//     value: '',
//   };

// handleInput = event => {
//   this.setState({ value: event.target.value });
// };

// handleSubmit = event => {
//   event.preventDefault();
//   this.props.onSubmit(this.state.value);
//   this.setState({ value: '' });
// };
// render() {
//   return (
//     <SearchFormStyled onSubmit={this.handleSubmit}>
//       <FormBtn type="submit">
//         <FiSearch size="16px" />
//       </FormBtn>
//       <InputSearch
//         placeholder="What do you want to write?"
//         name="search"
//         required
//         autoFocus
//         value={this.state.value}
//         onChange={this.handleInput}
//       />
//     </SearchFormStyled>
//   );
// }
