import "./SemesterOption.css";

const SemesterOption = ({
  semester,
  semesterText,
  isSelected,
  onSelect
}: {
  semester: string,  
  semesterText: string
  isSelected: boolean
  onSelect: (semesterText: string) => void
}) => {

  return (
    <div
      className={isSelected ? "semester-option-selected" : "semester-option"}
      onClick={() => {onSelect(semesterText)}}
    >
      {semester}
    </div>
  );
};

export default SemesterOption;
