import role from '../models/role.js';

const registerRole = async(req, res) => {
    if(!req.body.name || !req.body.description) return res.status(400).send({messaage: "Incomplete data"});

    //It checks that name starts with upper case, and the rest of the word contains lower case.
    let name = req.body.name;
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    const existingRole = await role.findOne({name: name});
    if(existingRole) return res.status(400).send({messaage: "Role already register"});



    const roleSchema = new role({
        name: name,
        description: req.body.description
    })

    const result = await roleSchema.save();
    return result ? res.status(200).send({messaage: "Role registered correctly"}): res.status(400).send({messaage: "Failed to register role"});
}

export default {registerRole}