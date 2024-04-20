import EmployeeModel from "../Models/EmployeeModel.js";
import errorHandler from "../utils/errorHandler.js";

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
        return errorHandler(res, error);
    }
}

const EmployeeController = { getEmployeeDetail }

export default EmployeeController