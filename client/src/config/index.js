export const signUpFormControls = [
  {
    componentName: "input",
    componentType: "text",
    name: "firstName",
    label: "First Name",
    placeholder: "Enter your first name",
  },
  {
    componentName: "input",
    componentType: "text",
    name: "lastName",
    label: "Last Name",
    placeholder: "Enter your last name",
  },
  {
    componentName: "input",
    componentType: "email",
    name: "email",
    label: "Email",
    placeholder: "Enter your email address",
  },
  {
    componentName: "input",
    componentType: "password",
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
  },
  {
    componentName: "input",
    componentType: "password",
    name: "repeatPassword",
    label: "Confirm Password",
    placeholder: "Re-enter your password",
  },
];

export const loginFormComtrols = [
  {
    componentName: "input",
    componentType: "text",
    name: "email",
    label: "Email",
    placeholder: "Enter your email address",
  },
  {
    componentName: "input",
    componentType: "password",
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
  },
];

export const initialLoginFormData = {
  email: "",  
  password: "",
};

export const initialSignUpFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export const initialCarFormData ={
    image :"",
    brand : "",
    model : "",
    year : "",
    pricePerDay : "",
    category : "",
    seating_capacity: "",
    fuel_type: "",
    transmission : "",
    location : "",
    description : "",
}

export const initialCarSearchParams ={
  location : "",
  pickupDate : "",
  returnDate : ""
}

