import jwt from 'jsonwebtoken';
import AdminModel from './model/admin.js';
import UserModel from './model/user.js'


export async function saveUser(req, res) {
    try {
        console.log(req.body);
        const { firstName, photo, userId } = req.body;

        // Check if user with the same email already exists
        const existingUser = await UserModel.findOne({ userId });
        if (existingUser) {
            return res.status(400).send({ error: 'User with this email already exists' });
        }

        // Create new user
        const newUser = await UserModel.create({
            firstName,
            photo,
            userId,
        });

        return res.status(200).send({
            msg: 'User Created Successfully...!'
        });
    }
    catch (error) {
        return res.status(500).send({ error: error.message || 'Internal Server Error' });
    }
}
export async function userLogin(req, res) {
    try {
        const { email, password } = req.body;

        // Check for an existing email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        // Compare plain text password with stored hashed password
        if (password !== user.password) {
            return res.status(400).send({ error: "Password does not match" });
        }

        // Create jwt token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWTPRIVATEKEY,
            { expiresIn: "24h" }
        );

        return res.status(200).send({
            msg: "Login Successful...!",
            token
        });

    } catch (error) {
        return res.status(500).send({ error: error.message || "Internal Server Error" });
    }
}

export async function adminLogin(req, res) {
    try {
        const { email, password } = req.body;

        // Check for an existing email
        const user = await AdminModel.findOne({ email });

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        // Compare plain text password with stored hashed password
        if (password !== user.password) {
            return res.status(400).send({ error: "Password does not match" });
        }

        // Create jwt token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWTPRIVATEKEY,
            { expiresIn: "24h" }
        );

        return res.status(200).send({
            msg: "Login Successful...!",
            token
        });

    } catch (error) {
        return res.status(500).send({ error: error.message || "Internal Server Error" });
    }
}

export async function createUser(req, res) {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        // Check if user with the same email already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'User with this email already exists' });
        }

        // Generate a unique 4-digit ID
        let userId;
        do {
            userId = generateuserId();
        } while (await UserModel.findOne({ userId }));

        // Create new user
        const newUser = await UserModel.create({
            email,
            password,
            userId,
        });

        return res.status(200).send({
            msg: 'User Created Successfully...!'
        });

    } catch (error) {
        return res.status(500).send({ error: error.message || 'Internal Server Error' });
    }
}

function generateuserId() {
    // Generate a random 4-digit number
    return Math.floor(1000 + Math.random() * 9000).toString();
}


export async function getUsers(req, res) {
    try {
        const users = await UserModel.find({}, { password: 0 });
        console.log(users)
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send({ error: error.message || 'Internal Server Error' });
    }
}
