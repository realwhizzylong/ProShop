import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Whizzy Long',
        email: 'whizzy@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'LeBron James',
        email: 'lebron@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Stephen Curry',
        email: 'steph@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users;