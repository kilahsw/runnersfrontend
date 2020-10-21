import React from "react";

const Form = (props) => {
    //STATE FOR THE FORM
    const [formData, setFormData] = React.useState(props.shoes);

    //FUNCTIONS
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent Form from Refreshing
        props.handleSubmit(formData); // Submit to Parents desired function -- will create and update dogs
        props.history.push("/"); //Push back to display page
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="text"
                runType="text"
                value={formData.name}
                onChange={handleChange}
            />
            <input type="submit" value={props.label} />
        </form>
    );
};

export default Form;
