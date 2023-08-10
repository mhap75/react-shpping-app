import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import {SignUp} from "../components/Pages/SignUp";
import TableRow from "../components/Common/TableRow";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/SignUp">
                <SignUp/>
            </ComponentPreview>
            <ComponentPreview path="/TableRow">
                <TableRow/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews