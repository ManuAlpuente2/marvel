import { forwardRef } from "react";
import { ReactComponent as IconSearch } from "./../../assets/img/icon-search.svg";
import "./SearchInput.scss";

const SearchInput = forwardRef(({ onSearch }, ref) => (
  <div className="marvel-input-container">
    <input
      ref={ref}
      type="text"
      placeholder="Search a character"
      onChange={onSearch}
      className="marvel-search-input"
    />
    <IconSearch className="marvel-icon-search" />
  </div>
));

export default SearchInput;
