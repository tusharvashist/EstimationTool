import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import MaterialTable from "material-table";
import "../estimationDetail/EstimationDetail.css";
import useLoader from "../../shared/layout/hooks/useLoader";
import counting from "../../assests/team.png";
import RoleCount from "../../shared/layout/PopTable/RoleCount";


const ResourceCountMatrix = (props) => {

const estimationHeaderId =  props.data;

const popupCount = () => {};

const columns = [
  { title: "Count", field: "count", width: "1%" },
  {
    title: "Skills(Effort & summary Attribute)",
    field: "skill",
    width: "40%",
  },
  { title: "Technologies", field: "technology", width: "20%" },
  {
    title: "Role",
    field: "role",
    width: "50%",
    render: (rowData) => <RoleCount className="roleCountInput" />,
  },
];

//Mock data resource count 
const rowData = [
  {
    count: 2,
    skill: "Frontend",
    technology: "React/Angular",
    // role: "1 Lead, 1 Sr. Developer, 1 Jr Developer",
  },
  {
    count: 2,
    skill: "Frontend",
    technology: "React/Angular",
    // role: "1 Lead, 1 Sr. Developer, 1 Jr Developer",
  },
  {
    count: 2,
    skill: "Frontend",
    technology: "React/Angular",
    // role: "1 Lead, 1 Sr. Developer, 1 Jr Developer",
  },
];

const handleCountTable = () => {
  const tableDiv = document.querySelector(".estimation-detail-count-table");
  if (tableDiv.classList.contains("close-resourceCountTable")) {
    tableDiv.classList.remove("close-resourceCountTable");
    tableDiv.classList.add("open");
  } else {
    tableDiv.classList.add("close-resourceCountTable");
    tableDiv.classList.remove("open");
  }
};

const handleRowClick = (rowData) => {
  console.log(rowData);
  const roleDiv = document.querySelector(".rolelist");
  roleDiv.classList.toggle("close-role");
};

    return (
        <div className="estimation-detail-cover">
          <div className="estimation-detail-count-table close-resourceCountTable">
            <BorderedContainer className="count-box-shadow roleCountInputParent">
              <MaterialTable
                style={{ boxShadow: "none" }}
                title="Resource Count"
                columns={columns}
                options={{
                  search: false,
                  tableLayout: "auto",
                  paging: false,
                }}
                data={rowData}
              />
              <div className="resource-cont-costing">
                <h4>Costing: $1000</h4>
                <h4 className="inline-cost">Expected Timeline: $1000</h4>
                <h4 className="inline-cost">Actual Timeline: $1000</h4>
              </div>
            </BorderedContainer>
          </div>
          <div className="estimation-detail-button-container">
            <button
              onClick={handleCountTable}
              className="estimation-detail-count-button"
            >
              <img src={counting} />
            </button>
          </div>         
        </div>
      );
}

export default ResourceCountMatrix;
