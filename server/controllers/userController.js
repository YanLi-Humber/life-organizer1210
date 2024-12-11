const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Controller for updating user settings
exports.updateSettings = async (req, res) => {
    const { password, country, timeZone } = req.body;

    try {
        const userId = req.user.id; // Extracted from `authMiddleware`

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields based on user input
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        if (country) {
            user.country = country;
        }

        if (timeZone) {
            user.timeZone = timeZone;
        }

        // Save the updated user
        await user.save();

        res.status(200).json({ message: 'Settings updated successfully' });
    } catch (error) {
        console.error('Error updating settings:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
