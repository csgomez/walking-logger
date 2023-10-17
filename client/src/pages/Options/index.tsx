import { fetchWalkingStatsFile } from '../../services/api';
import { downloadFile } from './utils';

const Options = () => {
  const handleDataExport = async () => {
    try {
      const response = await fetchWalkingStatsFile();

      const fileData = response.data;
      const filename =
        response.headers['x-filename'] || 'WalkingLogger-data.json';

      downloadFile(fileData, filename);
    } catch (err) {
      console.error('Error getting walking stats file from server:', err);
    }
  };

  return (
    <div className="options-page">
      <OptionItem
        optionTitle="Export Data"
        buttonText="Export"
        onClick={handleDataExport}
      />
      <OptionItem optionTitle="Import Data" buttonText="Import" />
      <OptionItem optionTitle="Clear Data" buttonText="Clear" />
    </div>
  );
};

interface OptionProps {
  optionTitle: string;
  buttonText: string;
  onClick?: () => void;
}

const OptionItem = ({ optionTitle, buttonText, onClick }: OptionProps) => {
  return (
    <div className="py-2 d-flex flex-row align-items-center justify-content-between">
      <p>{optionTitle}</p>
      <button className="btn btn-sm btn-primary" onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default Options;
