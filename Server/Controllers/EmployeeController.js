import EmployeeModel from '../Models/EmployeeModel.js';

const getEmployeeDetail = async (req, res) => {
    let { _id } = req.params;
    try {
        let results = await EmployeeModel.find({ _id: _id }, '-password');
        return res.status(200).json({
            status: "success",
            message: "Get employee detail successful",
            data: results
        })
    } catch (error) {
        console.log("Get employeeDetail error", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: {
                code: "SERVER_ERROR",
                description: "An unexpected error occurred on the server."
            }
        });
    }
}

const AuthController = {
    getEmployeeDetail
}
export default AuthController;