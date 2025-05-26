const userRepository = require('./Repository');
const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/jwtUtils');
const { updateResource } = require('../../utils/dbUtils');

const USER_TABLE = 'users';

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

const updateUsername = async (userId, newUsername) => {
    // Validate user exists
    const user = await userRepository.findUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    // Check if new username is available
    const usernameTaken = await userRepository.isUsernameTaken(newUsername);
    if (usernameTaken) {
        throw new Error('Username is already taken');
    }

    // Update username
    const updatedUser = await updateResource(USER_TABLE, userId, { username: newUsername }, ['username']);
    
    return {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email
    };
};

const updateEmail = async (userId, newEmail) => {
    // Validate user exists
    const user = await userRepository.findUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
        throw new Error('Invalid email format');
    }

    // Check if new email is available
    const emailTaken = await userRepository.isEmailTaken(newEmail);
    if (emailTaken) {
        throw new Error('Email is already in use');
    }

    // Update email
    const updatedUser = await updateResource(USER_TABLE, userId, { email: newEmail }, ['email']);
    
    return {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email
    };
};

const updatePassword = async (userId, currentPassword, newPassword) => {
    // Validate user exists
    const user = await userRepository.findUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    // Verify current password
    const passwordMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!passwordMatch) {
        throw new Error('Current password is incorrect');
    }

    // Validate password strength
    if (newPassword.length < 8) {
        throw new Error('Password must be at least 8 characters long');
    }

    // Hash new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await updateResource(USER_TABLE, userId, { password_hash: hashedPassword }, ['password_hash']);
    
    return { message: 'Password updated successfully' };
};

module.exports = {
    loginUser,
    updateUsername,
    updateEmail,
    updatePassword
};
