import React from 'react'
import { connect } from 'react-redux'
import { handleUploadFileChange } from '../reducers/aoiReducer'
import styled, { keyframes } from 'styled-components'

const hoverMargin = keyframes`
  from {
    margin-left: 10px;
  }
  to {
    margin-left: 13px;
  }
`
const StyledDiv = styled.div`
  margin: 14px 10px;
  &:hover {
    //margin-left: 13px;
    animation: ${hoverMargin} 0.15s both;
  }
`
const StyledInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`
const StyledInputLabel = styled.label`
  cursor: pointer;
  color: white;
  padding: 7px 13px 7px 13px;
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 30px;
  font-weight: 300;
  font-size: 17px;
  width: max-content;
  max-width: 90%;
  overflow: auto;
  height: min-content;
  pointer-events: auto;
`

const GeoJsonUploader = (props) => {
  let fileReader = null

  const handleFileRead = () => {
    const content = fileReader.result
    console.log('content:', content)
    props.handleUploadFileChange(content)
  }

  const handleFileChosen = (file) => {
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(file)
  }

  return (
    <StyledDiv>
      <StyledInput
        type='file'
        id='file'
        className='input-file'
        acept='.geojson'
        onChange={e => handleFileChosen(e.target.files[0])}>
      </StyledInput>
      <StyledInputLabel htmlFor="file">Upload AOI</StyledInputLabel>
    </StyledDiv>
  )
}

const mapDispatchToProps = {
  handleUploadFileChange,
}

const ConnectedGeoJsonUploader = connect(null, mapDispatchToProps)(GeoJsonUploader)

export default ConnectedGeoJsonUploader
