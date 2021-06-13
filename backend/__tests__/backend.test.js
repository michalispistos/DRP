const SequelizeMock = require('sequelize-mock');
const makeServer = require('../server');
const dbMock = new SequelizeMock();
const Project = require('../db/projectModel')(SequelizeMock, dbMock);
const User = require('../db/userModel')(SequelizeMock, dbMock);
const supertest = require('supertest');

const db = {
    Sequelize: SequelizeMock,
    sequelize: dbMock,
    Project,
    User,
    models: Project,
}


const testServer = makeServer(db, 5999);
const requestWithSupertest = supertest(testServer);


beforeEach(async () => {
    await Project.$queueResult(Project.build({
        name:"Healthcare App",
        description:"App to stop obesity",
        leader: "emily",
        members:["emily","charles"],
        looking_for:"a computing student to code our app",
        duration:"12 weeks",
        tags:["java","obesity","healthcare"]
    }));
});

describe('GET', function () {

  it('/projects returns all projects in the database', async () => {
    const res = await requestWithSupertest.get('/projects');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
  });

  it('/projects/:id should show a project', async () => {        
    const res = await requestWithSupertest.get('/projects/1')
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name');
    expect(res.body.name).toEqual("Healthcare App");
  }); 
 

}); 


const testProject = {
  name:"Test Project",
  description:"This is a mock project for testing",
  leader: "bob",
  members:["bob","eva"],
  looking_for:"a test that works",
  paid:true,
  location: "London, UK",
  duration:"1 minute",
  tags:["algorithmic trading","stocks","finances"]
}




describe('POST /projects', function () {

  it('should let you post a project', async () => {        
      const res = await requestWithSupertest.post('/projects').send(testProject);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('name');
      expect(res.body.name).toEqual("Test Project");
  }); 
  
  it('should store the posted project in the database', async () => {        
    const res = await requestWithSupertest.post('/projects').send(testProject);

    expect(res.statusCode).toEqual(200);

    const project = await db.Project.findOne({
        where: {
            name: "Test Project",
        }
    });
    //expect that project contains the new test project idk
    expect(project).not.toBeNull();
  }); 

});

afterAll(done => {
  testServer.close(done);
});



