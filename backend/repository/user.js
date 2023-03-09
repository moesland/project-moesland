const bcrypt = require('bcrypt')

const dummyDataUser = {
    "email": "admin@moesland.com",
    "password": "root"
}


module.exports = {
    getPreciseUser: async function (email, password) {
        const user = await findOne({ email });

        if (!user) {
            return null;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        
        if (!isPasswordMatch) {
            return null; 
        }

        return user;
    },

    findOne: async function (email) {


        return user;
    }

}