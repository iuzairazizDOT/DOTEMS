import * as Yup from "yup";

class MachineValidation {
  newMachineValidation = () => {
    return Yup.object({
      machineName: Yup.string()
        .required("Required!")
        .min(2)
        .max(100),
      processor: Yup.string().required("Required!"),
      memory: Yup.string().required("Required!"),
      graphics: Yup.string().required("Required!"),
      accessories: Yup.array(),
      notes: Yup.object().required("Required!"),
      machineNo: Yup.number("Enter A Number").required("Required!"),
      storage: Yup.string().required("Required!"),
      status: Yup.object().required("Required!"),
      ownership: Yup.object().required("Required!"),
      serialno: Yup.string().required("Required!"),
    });
  };

  handleError(error) {
    console.log(error.message);
  }
}
const machineValidation = new MachineValidation();
export default machineValidation;
