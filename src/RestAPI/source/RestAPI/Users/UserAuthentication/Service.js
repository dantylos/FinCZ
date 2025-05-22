const userRepository = require('./Repository');
const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/jwtUtils');

const loginUser = async ({ username, password }) => {
    const user = await userRepository.findUserByUsername(username);
    if (!user) {
        throw new Error('Invalid username or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
        throw new Error('Invalid username or password');
    }

    // Генерация JWT с userId и username
    const token = generateToken({ userId: user.id, username: user.username });

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        }
    };
};

module.exports = {
    loginUser,
};
