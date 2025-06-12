import "../Signup/auth.css";
import CreateWorkspaceModal from "../Home/WorkspaceSelector/CreateWorkspaceModal";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";
import { workspaceRepository } from "../../modules/workspaces/workspace.repository";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Workspace } from "../../modules/workspaces/workspace.entity";

function CreateWorkspace() {
  const { currentUser } = useCurrentUserStore();
  const navigate = useNavigate();
  const [homeWorkspace, setHomeWorkspace] = useState<Workspace | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const workspaces = await workspaceRepository.find();
      setHomeWorkspace(workspaces[0]);
      setIsLoading(false);
    } catch (error) {
      console.error("ワークスペースの取得に失敗しました", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createWorkspace = async (name: string) => {
    try {
      const newWorkspace = await workspaceRepository.create(name);
      navigate(`/${newWorkspace.id}/${newWorkspace.channels[0].id}`);
    } catch (error) {
      console.error("ワークスペースの作成に失敗しました", error);
    }
  };

  if (isLoading) return <div />;
  if (currentUser == null) return <Navigate to="/signin" />;
  if (homeWorkspace != null)
    return (
      <Navigate to={`/${homeWorkspace.id}/${homeWorkspace.channels[0].id}`} />
    );

  return (
    <div>
      <CreateWorkspaceModal onSubmit={createWorkspace} />
    </div>
  );
}

export default CreateWorkspace;
