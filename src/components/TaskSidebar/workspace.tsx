import { useEffect, useState } from "react";
import CreateProjectModal from "../Modal/createProjectmodal";
import ProjectList from "./projectlist";
import useProjects from "../../hooks/useProjects";

export interface WorkspaceProps {
  workspaceId: number;
  workspaceColor?: string;
  WorkspaceName: string;
}

const Workspace: React.FC<WorkspaceProps> = ({
  workspaceId,
  workspaceColor,
  WorkspaceName,
}: WorkspaceProps) => {
  const {
    projects,
    getProjects,
    addProject,
    updateProjectName,
    deleteProject,
  } = useProjects(workspaceId);
  useEffect(() => {
    getProjects();
  }, [workspaceId]);

  const [isHovered, setIsHovered] = useState(false);
  const [isWorkspaceModal, setIsWorkspaceModal] = useState(false);

  const handleCloseModal = () => {
    setIsWorkspaceModal(false);
  };

  const handleButtonClick = () => {
    setIsWorkspaceModal(true);
  };

  return (
    <div>
      <li
        key={workspaceId}
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex justify-between">
          <div className="flex  gap-2">
            <span
              className="w-4 h-4 rounded "
              style={{ backgroundColor: workspaceColor }}
            />
            <p>{WorkspaceName}</p>
          </div>
          <button
            className={` ${
              isHovered ? "visible" : "invisible"
            }  text-black rounded  `}
            onClick={handleButtonClick}
          >
            {" "}
            ...{" "}
          </button>
        </div>
      </li>

      <li>
        <div>
          <ProjectList
            workspaceId={workspaceId}
            projects={projects}
            updateProjectName={updateProjectName}
            deleteProject={deleteProject}
          />
        </div>
      </li>

      {isWorkspaceModal && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <CreateProjectModal
              onClose={handleCloseModal}
              workspaceId={workspaceId}
              onAddProject={addProject}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Workspace;
