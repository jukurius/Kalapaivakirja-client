import Page1 from './formPages/Page1';
import Page2 from './formPages/Page2';
import Page3 from './formPages/Page3';
import useUploadContext from '../../../hooks/useUploadContext';

const FormInputs = () => {

    const { page } = useUploadContext()

    const display = {
        0: <Page1 />,
        1: <Page2 />,
        2: <Page3 />
    }

    const content = (
        <div className="form-inputs flex-col">
            {display[page]}
        </div>
    )

    return content
}
export default FormInputs