import axios from 'axios';

const Options = () => {
  // TODO: Clean this mess of a function up
  const handleDataExport = async () => {
    try {
      const response = await axios.get('http://localhost:3001/data', {
        responseType: 'blob',
      });

      const href = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = href;
      const filename =
        response.headers['x-filename'] || 'WalkingLogger-data.json';
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();

      console.log(response.data);

      // cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    } catch (err) {
      console.error('Error getting walking stats file from server:', err);
    }
  };

  return (
    <div className="options-page">
      {/* <Option optionName="Export Data" buttonName="Export" />
      <Option optionName="Import Data" buttonName="Import" />
      <Option optionName="Clear Data" buttonName="Clear" /> */}
      <div>
        <p>Export Data</p>
        <button className="btn btn-outline-primary" onClick={handleDataExport}>
          Export
        </button>
      </div>
      <div>
        <p>Import Data</p>
        <button className="btn btn-outline-primary">Import</button>
      </div>
      <div>
        <p>Delete Data</p>
        <button className="btn btn-outline-primary">Delete</button>
      </div>
    </div>
  );
};

// interface OptionProps {
//   optionName: string;
//   buttonName: string;
// }

// const Option = ({ optionName, buttonName }: OptionProps) => {
//   return (
//     <div className="d-flex flex-row align-items-center">
//       <p>{optionName}</p>{' '}
//       <button className="btn btn-sm btn-outline-primary">{buttonName}</button>
//     </div>
//   );
// };

export default Options;
