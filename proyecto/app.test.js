const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let app;
jest.setTimeout(60000); 

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    process.env.MONGO_URI = mongoUri;
    process.env.PORT = 0; 
    
    const server = require('../app');
    app = server.app || server; 

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoUri);
    }
    
    const collection = mongoose.connection.collection('partidos');
    await collection.insertMany([
        { _id: new mongoose.Types.ObjectId('660c12345678901234567891'), date: '2020-01-07', home_team: 'Barbados', away_team: 'Canada', home_score: 1, away_score: 4, tournament: 'Friendly', city: 'Irvine', country: 'United States', neutral: true },
        { _id: new mongoose.Types.ObjectId('660c12345678901234567892'), date: '2021-06-13', home_team: 'Brazil', away_team: 'Venezuela', home_score: 3, away_score: 0, tournament: 'Copa América', city: 'Brasília', country: 'Brazil', neutral: false },
        { _id: new mongoose.Types.ObjectId('660c12345678901234567893'), date: '2021-07-10', home_team: 'Argentina', away_team: 'Brazil', home_score: 1, away_score: 0, tournament: 'Copa América', city: 'Rio de Janeiro', country: 'Brazil', neutral: true },
    ]);
});

afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) {
        await mongoServer.stop();
    }
});

describe('Endpoints de Partidos (Arquitectura por Capas)', () => {

    describe('GET /partidos', () => {
        it('debería retornar 200 y una lista de partidos', async () => {
            const res = await request(app).get('/partidos');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body.length).toBeGreaterThanOrEqual(3);
        });
    });

    describe('GET /partidos/:id', () => {
        it('debería retornar 200 y el partido con ID válido', async () => {
            const res = await request(app).get('/partidos/660c12345678901234567892');
            expect(res.status).toBe(200);
            expect(res.body.home_team).toBe('Brazil');
        });

        it('debería retornar 404 si el partido no existe', async () => {
            const res = await request(app).get('/partidos/660c12345678901234567899');
            expect(res.status).toBe(404);
        });
    });

    describe('POST /partidos', () => {
        it('debería retornar 201 y crear un partido nuevo', async () => {
            const nuevoPartido = {
                date: '2024-06-20',
                home_team: 'Argentina',
                away_team: 'Canada',
                home_score: 2,
                away_score: 0,
                tournament: 'Copa América',
                city: 'Atlanta',
                country: 'United States',
                neutral: true
            };
            const res = await request(app).post('/partidos').send(nuevoPartido);
            expect(res.status).toBe(201);
            expect(res.body._id).toBeDefined();
            expect(res.body.home_team).toBe('Argentina');
        });
    });

    describe('PUT /partidos/:id', () => {
        it('debería actualizar un partido y retornar 200', async () => {
            const actualizacion = {
                home_score: 5
            };
            const res = await request(app).put('/partidos/660c12345678901234567891').send(actualizacion);
            expect(res.status).toBe(200);
            
            const verify = await request(app).get('/partidos/660c12345678901234567891');
            expect(verify.body.home_score).toBe(5);
        });
    });

    describe('DELETE /partidos/:id', () => {
        it('debería retornar 200 y eliminar el partido', async () => {
            const res = await request(app).delete('/partidos/660c12345678901234567891');
            expect(res.status).toBe(200);
            
            const verify = await request(app).get('/partidos/660c12345678901234567891');
            expect(verify.status).toBe(404);
        });
    });

    describe('Búsquedas Especializadas', () => {
        it('GET /partidos/torneo/:torneo - debería filtrar por torneo', async () => {
            const res = await request(app).get('/partidos/torneo/Copa América');
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThanOrEqual(2);
            expect(res.body[0].tournament).toBe('Copa América');
        });

        it('GET /partidos/equipo/:equipo - debería filtrar por equipo', async () => {
            const res = await request(app).get('/partidos/equipo/Brazil');
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThanOrEqual(2);
        });

        it('GET /partidos/fecha/:fechaInicio-:fechaFin - debería filtrar por rango de fechas', async () => {
            const res = await request(app).get('/partidos/fecha/2021-01-01-2021-12-31');
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThanOrEqual(2); 
            expect(res.body[0].date.startsWith('2021')).toBeTruthy();
        });
    });

});
