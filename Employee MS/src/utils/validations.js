import { toast } from "react-toastify";

const dateValidation = (employeeData) => {
    const { dob, start_date } = employeeData;

    const dobToDate = new Date(dob);
    const start_dateToDate = new Date(start_date);
    const today = new Date();

    dobToDate.setHours(0, 0, 0, 0);
    start_dateToDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (dobToDate > today) {
        toast.error("Invalid date of birth");
        return false;
    }

    if (start_dateToDate < dobToDate) {
        toast.error("The start date must be after the date of birth");
        return false;
    }

    return true;
};
const validation = { dateValidation };
export default validation;