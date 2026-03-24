interface OfficerProps {
  officer: {
    fields: {
      name: string;
      role: string;
      managementCommittee: boolean;
    };
  };
}

const Officer: React.FC<OfficerProps> = ({ officer }) => {
  return (
    <div className="flex flex-row justify-between w-full lg:flex-row bg-gray-300 text-primary-darker rounded-lg p-1 lg:p-2">
      <h4 className="pr-2">{officer.fields.role}</h4>
      <h4 className="font-bold text-right">{officer.fields.name}</h4>
    </div>
  );
};

export default Officer;
