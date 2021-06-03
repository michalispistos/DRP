makeServer = require('./server');
TestPool = require('./testPool');
const testPool = new TestPool()
const server = makeServer(testPool, 5999);
const supertest = require('supertest');
const requestWithSupertest = supertest(server);


describe('Requests on database', () => {

    it('GET /projects returns all projects in the database', async () => {
      const res = await requestWithSupertest.get('/projects');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body.size).toEqual(testPool.data.rows.size);
    });

    it('GET /projects/:id should show a project', async () => {
        const res = await requestWithSupertest.get('/projects/0');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title');
    }); 

    afterAll(done => {
      server.close(done);
    });

});
  