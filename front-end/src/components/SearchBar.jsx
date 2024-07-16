export function SearchBar({ update }) {
    return (
      <div className="flex items-center rounded-lg shadow-md">
        <input
          placeholder="Search Items Here"
          type="text"
          className="flex-1 rounded-lg p-3 border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-200 text-base"
          onChange={update}
        />
      </div>
    );
  }
  