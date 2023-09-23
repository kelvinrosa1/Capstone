/* eslint-disable react/prop-types */

function SearchInput({ searchTerm, setSearchTerm }) {
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
