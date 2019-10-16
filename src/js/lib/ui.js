const UI = (() => {
  const renderStaticHtml = () => {
    document.getElementById('content').innerHTML = `
  <nav class="navbar-fixed">
  <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
  <div class="max-width">
    <a href="#" class="text-off-white">
      <i class="large material-icons">today</i>
      <h1>Todos</h1>
    </a>
  </div>
</nav>
<div id="create-project-form-modal" class="modal">
  <div class="modal-content grey darken-4">
    <form id="create-project-form" action="#">
      <div class="input-field">
        <input type="text" name="title" id="title" class="validate" placeholder="Add New Project" required=""
          aria-required="true">
      </div>
      <button id="submit" class="red accent-4 modal-action btn waves-effect waves-light" type="submit"
        name="action">
        Submit
      </button>
    </form>
  </div>
</div>
<main>
  <div class="max-width">
    <ul id="nav-mobile projects-side-nav" class="sidenav sidenav-fixed ">
      <li>
        <a class=" modal-trigger" href="#create-project-form-modal">
          <i class="material-icons">view_module</i>
          Projects
          <i class="material-icons right">add</i>
        </a>
      </li>
      <div class="divider"></div>
      <div id="projects-list">
      </div>
      <li id="add-project-btn">
        <a class=" modal-trigger" href="#create-project-form-modal">
          Add Project
          <i class="material-icons red-text">add</i>
        </a>
      </li>
    </ul>
    <div class="todos-area">
      <table>
      <thead >
        <div id="project-header">
        <h5>Project Name<h5>
        <div class="divider"></div>
        </div>
      </thead>
      </table>
    </div>
  </div>
</main>
  `;
  };

  let projectsList;
  let projectHeader;

  const renderProject = ({
    DB,
    id,
  }) => {
    const html = `
    <h5>${DB[id].name}<h5>
    <div class="divider"></div>
    `;
    projectHeader.innerHTML = html;
  };

  const addListenersToProjectsList = (DB) => {
    Array.from(projectsList.children).forEach((project) => {
      project.addEventListener('click', () => {
        const projectID = project.getAttribute('data-id');

        UI.renderProject({
          DB,
          id: projectID,
        });
      });
    });
  };

  const renderProjectsList = (DB) => {
    let html = '';
    Object.keys(DB).forEach((projectID) => {
      html += `
        <li class="project-btn" data-id="${projectID}">
          <a href="#!"> ${DB[projectID].name}
          </a>
        </li>
      `;
    });
    projectsList.innerHTML = html;

    addListenersToProjectsList(DB);
  };

  const initialize = (DB) => {
    renderStaticHtml();
    projectsList = document.getElementById('projects-list');
    projectHeader = document.getElementById('project-header');

    renderProjectsList(DB);
    renderProject({
      DB,
      id: Object.keys(DB)[0],
    });
  };

  const getInputs = () => {
    const createProjectForm = document.getElementById('create-project-form');
    return [createProjectForm];
  };


  return {
    initialize,
    getInputs,
    renderProjectsList,
    renderProject,
  };
})();

export default UI;