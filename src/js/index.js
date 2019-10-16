import '../scss/main.scss';
import UI from './lib/ui.js';
import app from './lib/app';

app.initialize();
UI.initialize(app.getDB());

const [
  createProjectForm,
] = UI.getInputs();

createProjectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = createProjectForm[0].value;

  app.createProject({ name });
  UI.renderProjectsList(app.getDB());

  // eslint-disable-next-line no-undef
  M.Modal.getInstance(document.getElementById('create-project-form-modal')).close();
  createProjectForm.reset();
});
