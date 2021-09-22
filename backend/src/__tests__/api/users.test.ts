import request from 'supertest';
import server from '../../server';

import User from '../../api/users/user.model';
import setupDBContainer from '../../test-setup';

const { setupDB } = setupDBContainer;

setupDB('user-endpoint-testing', true);

//TODO: some of these tests should be split to different ones

// users retrieving the user list
describe('GET /', () => {
  // handle success case
  test('retrieve the correct number of users from the database', async () => {
    const res = await request(server.callback()).get('/api/users/');

    expect(res.status).toBe(200);
    // Ensure that the query contains an array with the correct amount of items
    const users = await User.find({});
    expect(users.length).toBe(3);
  });
});

// retrieve only a specific user
describe('GET /:userId', () => {
  // handle success case
  test('retrieve the correct user given an id', async () => {
    // note: 12-byte string is used to mock MongoDB ObjectId
    const res = await request(server.callback()).get('/api/users/000000000001');

    expect(res.status).toBe(200);
    // Ensure it returns the correct user object
    const user = await User.findById('000000000001');
    expect(user).toMatchObject({
      _id: '000000000001',
      name: 'Thor 1/6 Scale',
      // TODO: Data structure for users still being decided
      user: 'Thor_fan',
      manufacturer: 'Hot Users',
      description:
        'Sophisticatedly crafted based on Chris Hemsworth’s appearance in the film with astonishing likeness, the Thor collectible figure features a newly developed head sculpt with specially applied luminous reflective effect on the eye that accentuates Thor using his thunder power, a newly developed muscular body with two pairs of interchangeable arms, intricately detailed body armor with LED light up circle plates and lightning effect accessories, a detachable red-colored cap, detail recreation of Thor’s weapon Stormbreaker, and a specially designed figure stand with movie logo.',
      image_url:
        'https://www.sideshow.com/storage/product-images/903422/thor_marvel_silo.png',
      franchise: 'Marvel',
      series: 'Avengers: Infinity War',
    });
  });

  //  handle fail case
  test('return status code of `404` and query return value of `null` if user does not exist', async () => {
    // note: 12-byte string is used to mock MongoDB ObjectId
    const res = await request(server.callback()).get('/api/users/000000000009');

    expect(res.status).toBe(404);
    // Ensure it returns null (meaning nothing was found using that id)
    const user = await User.findById('000000000009');
    expect(user).toBe(null);
  });
});

describe('POST /', () => {
  // handle success case
  test('return status code of `201` when sending valid data', async () => {
    const res = await request(server.callback()).post('/api/users/').send({
      name: 'Thor 1/6 Scale',
      // TODO: Data structure for users still being decided
      user: 'Thor_fan',
      manufacturer: 'Hot Users',
      description:
        'Sophisticatedly crafted based on Chris Hemsworth’s appearance in the film with astonishing likeness, the Thor collectible figure features a newly developed head sculpt with specially applied luminous reflective effect on the eye that accentuates Thor using his thunder power, a newly developed muscular body with two pairs of interchangeable arms, intricately detailed body armor with LED light up circle plates and lightning effect accessories, a detachable red-colored cap, detail recreation of Thor’s weapon Stormbreaker, and a specially designed figure stand with movie logo.',
      franchise: 'Marvel',
      series: 'Avengers: Infinity War',
    });

    expect(res.status).toBe(201);
  });

  test('response contains the correct properties when sending valid data', async () => {
    const res = await request(server.callback()).post('/api/users/').send({
      name: 'Thor 1/6 Scale',
      // TODO: Data structure for users still being decided
      user: 'Thor_fan',
      manufacturer: 'Hot Users',
      description:
        'Sophisticatedly crafted based on Chris Hemsworth’s appearance in the film with astonishing likeness, the Thor collectible figure features a newly developed head sculpt with specially applied luminous reflective effect on the eye that accentuates Thor using his thunder power, a newly developed muscular body with two pairs of interchangeable arms, intricately detailed body armor with LED light up circle plates and lightning effect accessories, a detachable red-colored cap, detail recreation of Thor’s weapon Stormbreaker, and a specially designed figure stand with movie logo.',
      franchise: 'Marvel',
      series: 'Avengers: Infinity War',
    });

    // Ensure that the response contains the correct properties
    expect(res.body.name).toBeTruthy();
    expect(res.body.user).toBeTruthy();
    expect(res.body.manufacturer).toBeTruthy();
    expect(res.body.franchise).toBeTruthy();
    expect(res.body.series).toBeTruthy();
    expect(res.body.description).toBeTruthy();
  });

  test('Add user document to the database when sending valid data', async () => {
    const res = await request(server.callback()).post('/api/users/').send({
      name: 'Thor 1/6 Scale',
      // TODO: Data structure for users still being decided
      user: 'Thor_fan',
      manufacturer: 'Hot Users',
      description:
        'Sophisticatedly crafted based on Chris Hemsworth’s appearance in the film with astonishing likeness, the Thor collectible figure features a newly developed head sculpt with specially applied luminous reflective effect on the eye that accentuates Thor using his thunder power, a newly developed muscular body with two pairs of interchangeable arms, intricately detailed body armor with LED light up circle plates and lightning effect accessories, a detachable red-colored cap, detail recreation of Thor’s weapon Stormbreaker, and a specially designed figure stand with movie logo.',
      franchise: 'Marvel',
      series: 'Avengers: Infinity War',
    });

    // check if the user exists, with correct properties and values, in the database
    const user = await User.findById(res.body.id);
    expect(user.user).toBeTruthy();
    expect(user.manufacturer).toBeTruthy();
    expect(user.franchise).toBeTruthy();
    expect(user.series).toBeTruthy();
    expect(user.description).toBeTruthy();
  });

  // handle fail case
  test('missing user name should return status code `400` and error message', async () => {
    const res = await request(server.callback()).post('/api/users/').send({
      description: 'user without a name',
    });

    expect(res.status).toBe(400);
    // .toContain is used because the error message's wording could be changed
    expect(res.body.status).toContain('fail');
    expect(res.body.message).toContain('user should have a name');
  });
});

describe('PATCH /:userId', () => {
  // handle success case
  test('return status code `200` when valid data is sent', async () => {
    const res = await request(server.callback())
      .patch('/api/users/000000000001')
      .send({
        name: 'Captain America',
        // TODO: Data structure for users still being decided
        user: 'avenger_lover',
        manufacturer: 'Hot Users',
        description:
          'Authentic and detailed likeness of Chris Evans as Captain America in Avengers: Endgame',
        franchise: 'Marvel',
        series: 'Avengers: Endgame',
      });

    expect(res.status).toBe(200);
  });

  test('response body returns updated values when valid data is sent', async () => {
    const res = await request(server.callback())
      .patch('/api/users/000000000001')
      .send({
        name: 'Captain America',
        // TODO: Data structure for users still being decided
        user: 'avenger_lover',
        manufacturer: 'Hot Users',
        description:
          'Authentic and detailed likeness of Chris Evans as Captain America in Avengers: Endgame',
        franchise: 'Marvel',
        series: 'Avengers: Endgame',
      });

    // Ensure that the response contains the updated values
    expect(res.body.name).toBe('Captain America');
    // TODO: Replace this with the updated data structure for user
    // expect(res.body.user).toBe('avenger_lover');
    expect(res.body.manufacturer).toBe('Hot Users');
    expect(res.body.franchise).toBe('Marvel');
    expect(res.body.series).toBe('Avengers: Endgame');
    expect(res.body.description).toBe(
      'Authentic and detailed likeness of Chris Evans as Captain America in Avengers: Endgame',
    );
  });

  test('updates user document in the database when valid data is sent', async () => {
    const res = await request(server.callback())
      .patch('/api/users/000000000001')
      .send({
        name: 'Captain America',
        // TODO: Data structure for users still being decided
        user: 'avenger_lover',
        manufacturer: 'Hot Users',
        description:
          'Authentic and detailed likeness of Chris Evans as Captain America in Avengers: Endgame',
        franchise: 'Marvel',
        series: 'Avengers: Endgame',
      });

    // check if the user exists in the database
    const user = await User.findById(res.body.id);
    expect(user.name).toBe('Captain America');
    // TODO: Replace this with the updated data structure for user
    // expect(user.user).toBe('avenger_lover');
    expect(user.manufacturer).toBe('Hot Users');
    expect(user.franchise).toBe('Marvel');
    expect(user.series).toBe('Avengers: Endgame');
    expect(user.description).toBe(
      'Authentic and detailed likeness of Chris Evans as Captain America in Avengers: Endgame',
    );
  });

  // handle fail case
  // missing name property
  test('missing user name should return status code `400` and error message', async () => {
    const res = await request(server.callback())
      .patch('/api/users/:userId')
      .send({
        description: 'user without a name',
      });

    expect(res.status).toBe(400);
    // .toContain is used because the error message's wording could be changed
    expect(res.body.status).toContain('fail');
    expect(res.body.message).toContain('user should have a name');
  });

  // not found because of wrong id
  test('return status code of `404` and query return value of `null` if user does not exist', async () => {
    // note: 12-byte string is used to mock MongoDB ObjectId
    const res = await request(server.callback())
      .patch('/api/users/000000000009')
      .send({ name: 'new user name', description: 'new description' });

    expect(res.status).toBe(404);
    // Ensure it returns null (meaning nothing was found using that id)
    const user = await User.findById('000000000009');
    expect(user).toBe(null);
  });
});

describe('DELETE /:userId', () => {
  // handle success case
  test('return status code of `200` when deleting existing user', async () => {
    const res = await request(server.callback()).delete(
      '/api/users/000000000001',
    );

    expect(res.status).toBe(200);
  });

  test('remove the user from the database when deleting existing user', async () => {
    const res = await request(server.callback()).delete(
      '/api/users/000000000001',
    );

    // check if the user is no longer in the database
    const user = await User.findById(res.body.id);
    expect(user).toBe(null);
  });

  // handle fail case
  // not found because of wrong id
  test('return status code of `404` and query return value of `null` if user does not exist', async () => {
    // note: 12-byte string is used to mock MongoDB ObjectId
    const res = await request(server.callback()).delete(
      '/api/users/000000000009',
    );

    expect(res.status).toBe(404);
    // Ensure it returns null (meaning nothing was found using that id)
    const user = await User.findById('000000000009');
    expect(user).toBe(null);
  });
});
