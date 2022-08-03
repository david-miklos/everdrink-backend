import * as request from 'supertest';
import { CreateUserDto } from '../src/user/dto/user.create.dto';
import { Role } from '../src/user/role.enum';
import { UserDto } from 'src/user/dto/user.dto';
import { LoginUserDto } from 'src/user/dto/user.login.dto';
import { AddressCreateDto } from 'src/address/dto/address.create.dto';

const app = 'http://localhost:3000';

describe('ROOT', () => {
  it('shoud hello word', () => {
    return request(app).get('/').expect(200).expect('Hello World!');
  });
});

describe('AUTH', () => {
  it('shoud register', () => {
    let randomEmail = Math.random().toString(36).substring(7);
    console.log(randomEmail);
    const createUser: CreateUserDto = {
      email: randomEmail,
      password: 'password',
      role: Role.GUEST,
    };

    return request(app).post('/auth/signup').send(createUser).expect(201);
  });
});

describe('AUTH', () => {
  it('should reject duplicate registration', () => {
    const createUser: CreateUserDto = {
      email: 'admin@admin.com',
      password: 'admin',
      role: Role.ADMIN,
    };

    return request(app).post('/auth/signup').send(createUser).expect(400);
  });
});

//Bejelentkezeskor megkapjuk a token
describe('AUTH', () => {
  it('should sign the user in', () => {
    const login: LoginUserDto = {
      email: 'admin@admin.com',
      password: 'admin',
    };

    return request(app)
      .post('/auth/signin')
      .send(login)
      .expect(({ body }) => {
        expect(body.access_token).toBeDefined();
      })
      .expect(201);
  });
});

describe('AUTH', () => {
  it('should give invalid credentials', () => {
    const login: LoginUserDto = {
      email: 'admin@admin.com',
      password: 'wrongpassword',
    };

    return request(app)
      .post('/auth/signin')
      .send(login)
      .expect(({ body }) => {
        expect(body.statusCode).toBe(401);
        expect(body.message).toBe('Invalid credentials');
      })
      .expect(401);
  });
});

describe('PRODUCT', () => {
  it('should return the products', () => {
    return request(app)
      .get('/product')
      .expect(({ body }) => {
        expect(body).toBeDefined();
      })
      .expect(200);
  });
});

describe('PRODUCT', () => {
  it('should return a specific product', () => {
    const id = '073c9ca3-1f01-4b9d-ada5-ae2fdd8b285d';

    return request(app)
      .get(`/product/${id}/get`)
      .expect(({ body }) => {
        expect(body).toBeDefined();
        expect(body.id).toBe(id);
      })
      .expect(200);
  });
});

describe('USER', () => {
  it('should return GUEST users', () => {
    return request(app)
      .get('/user/guests')
      .expect(({ body }) => {
        expect(body).toBeDefined();
      })
      .expect(401);
  });
});

describe('USER', () => {
  it('should return GUEST users', async () => {
    const loginResponse = await request(app)
      .post('/auth/signin')
      .send({ email: 'admin@admin.com', password: 'admin' })
      .expect(201);
    const token = loginResponse.body.access_token;

    return request(app)
      .get('/user/guests')
      .set('Authorization', 'Bearer ' + token)
      .expect(({ body }) => {
        const guestUsers: UserDto[] = body as UserDto[];
        expect(guestUsers).toBeDefined();
        guestUsers.forEach((user) => {
          expect(user.role).toBe(Role.GUEST);
        });
      })
      .expect(200);
  });
});

describe('ADDRESS', () => {
  it('should create address', async () => {
    const testId = 'f7f5bbf3-92fb-453c-b8f9-b8c6c4ce0961';

    const loginResponse = await request(app)
      .post('/auth/signin')
      .send({ email: 'test@test.com', password: 'test' })
      .expect(201);
    const testToken = loginResponse.body.access_token;
    const addressCreateDto: AddressCreateDto = {
      phone: '123456789',
      country: 'Magyarország',
      region: 'Budapest',
      zip: '5555',
      city: 'Budapest',
      street: 'Vaci',
      street_number: '17',
    };

    return request(app)
      .post('/address/create')
      .set('Authorization', 'Bearer ' + testToken)
      .send(addressCreateDto)
      .expect(({ body }) => {
        expect(body.user.id).toBe(testId);
      })
      .expect(201);
  });
});
