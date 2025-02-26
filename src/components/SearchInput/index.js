import { ReactComponent as IconSearch } from "./../../assets/img/icon-search.svg";
import "./SearchInput.scss";

const SearchInput = ({ onSearch }) => (
  <div className="marvel-input-container">
    <input
      type="search"
      placeholder="SEARCH A CHARACTER"
      onChange={onSearch}
      className="marvel-search-input"
    />
    <IconSearch className="marvel-icon-search" />
  </div>
);

export default SearchInput;
