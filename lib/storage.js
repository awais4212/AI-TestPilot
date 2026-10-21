// ```javascript
// lib/storage.js

const STORAGE_KEY = "ai-testpilot-projects";

export function getProjects() {
  if (typeof window === "undefined") return [];

  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (!value) return [];

    const projects = JSON.parse(value);
    return Array.isArray(projects) ? projects : [];
  } catch {
    return [];
  }
}

export function saveProjects(projects) {
  if (typeof window === "undefined") return false;

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(projects)
    );
    return true;
  } catch {
    return false;
  }
}

export function getProject(projectId) {
  return getProjects().find(
    (project) => project.id === projectId
  ) || null;
}

export function saveProject(project) {
  const projects = getProjects();
  const index = projects.findIndex(
    (item) => item.id === project.id
  );

  const updated = [...projects];

  if (index >= 0) {
    updated[index] = {
      ...project,
      updatedAt: new Date().toISOString(),
    };
  } else {
    updated.unshift({
      ...project,
      createdAt: project.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return saveProjects(updated);
}

export function deleteProject(projectId) {
  return saveProjects(
    getProjects().filter(
      (project) => project.id !== projectId
    )
  );
}

export function clearProjects() {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage may be unavailable in private or restricted contexts.
  }
}
// ```
