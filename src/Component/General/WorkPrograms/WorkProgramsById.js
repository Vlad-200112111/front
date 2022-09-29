import {useParams} from "react-router-dom";

const WorkProgramsById = () => {
    const params = useParams()
    const idWorkProgram = params.idWorkProgram

    return (
        <div style={{height: '99vh'}}>
            <object
                data={`https://eos.zabgu.ru/local/working_program/modules/working_programs/PDF/PDF.php?workingProgramID=${idWorkProgram}`}
                type="application/pdf" width="100%" height="100%">
                <p>
                    Your browser does not support PDFs.
                    <a href="https://example.com/test.pdf">Download the PDF</a>
                </p>
            </object>
        </div>
    )
}
export default WorkProgramsById