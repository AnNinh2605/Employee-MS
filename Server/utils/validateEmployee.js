import Joi from 'joi';

// Define schema
const schemaValidate = Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

    phone: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .required(),

    salary: Joi.number()
        .positive()
        .precision(2)
        .required(),

    address: Joi.string()
        .trim()
        .min(1)
        .max(100)
        .required(),

    department_id: Joi.string()
        .trim()
        .min(1)
        .required(),

    position_id: Joi.string()
        .trim()
        .min(1)
        .required(),

    dob: Joi.date()
        .less('now')
        .required(),

    start_date: Joi.date()
        .required(),
})
    //custom validate for start_date
    .custom((obj, helpers) => {
        if (obj.start_date <= obj.dob) {
            return helpers.message('Start date must be after date of birth');
        }
        return obj;
    });

export default schemaValidate;
