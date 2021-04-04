import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Chris',
        email: 'chris@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'James',
        email: 'james@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users;