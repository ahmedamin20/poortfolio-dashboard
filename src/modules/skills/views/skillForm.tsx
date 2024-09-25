import {toastLoader} from "../../../utility/helpers/toastHelper";

const SkillForm = ({inUpdate, formikObject, loading}) => {
    const {handleSubmit, values, errors, handleBlur, handleChange, isSubmitting} = formikObject;

    toastLoader(loading)

    return (
        <div>
            <header>
                <title>{inUpdate ? 'Update' : 'Add'} Skills</title>
            </header>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SkillForm