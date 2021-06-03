function makeServer(pool, port) {
  const express = require('express');
  const cors = require('cors');
  const app = express();

  app.use(cors());
  app.use(express.json());

  //ROUTES
  // GET ALL PROJECTS
  app.get("/projects", async(req, res) => {
      try {
          const allProjects = await pool.query("SELECT * FROM projects");
          res.json(allProjects.rows)
      } catch (err) {
          console.error(err.message)
      }
  });

  // GET A PROJECT 
  app.get("/projects/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const projects = await pool.query("SELECT * FROM projects WHERE project_id = $1", [id]);
        res.json(projects.rows[0]);
      } catch (err) {
        console.error(err.message);
      }
    });



  return app.listen(port, () => {
      console.log(`Server has started on port ${port}`);
  });
}

module.exports = makeServer;