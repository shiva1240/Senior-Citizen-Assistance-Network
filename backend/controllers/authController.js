import user from '../models/user.model.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// Register a new user
export const registerUser = async (req, res) => {
    const { name, email, password, phone, address, role, emergencyContact } = req.body;

    try {
        const reqField = ['name', 'email', 'password', 'phone', 'address', 'role', 'emergencyContact'];
        for (const field of reqField) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `${field} is required` });
            }
        }

        const userExists = await user.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await user.create({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            role,
            emergencyContact,
        });


        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user: newUser,
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: "Server error" });
    }
};

// Login a user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Check if user exists
        const userexist = await user.findOne({ email });

        if (!userexist) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, userexist.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: userexist._id }, process.env.JWT_SECRETE, { expiresIn: "30d" });

        // Send success response
        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                _id: userexist._id,
                name: userexist.name,
                email: userexist.email,
                phone: userexist.phone,
                address: userexist.address,
                role: userexist.role,
            },
            token,
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get user profile
export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  };