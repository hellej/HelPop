import React from 'react'
import { connect } from 'react-redux'
import { handleUploadFileChange } from '../../reducers/drawReducer'
import styled from 'styled-components'

const StyledDiv = styled.div`
  margin: 12px 10px;
  transition-duration: 0.1s;
  -webkit-transition-duration: 0.1s; /* Safari */
  &:hover {
    margin-left: 13px;
  }
  @media (max-width: 500px) {
    margin: 11px 10px;
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
  padding: 7px 13px;
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 30px;
  font-weight: 300;
  font-size: 16px;
  width: max-content;
  max-width: 90%;
  overflow: auto;
  height: min-content;
  pointer-events: auto;
  @media (max-width: 500px) {
    font-size: 15px;
    padding: 6px 11px;
  }
`

const GeoJsonUploader = (props) => {
  let fileReader = null

  const handleFileRead = () => {
    const content = fileReader.result
    props.handleUploadFileChange(content)
  }

  const handleFileChosen = (target) => {
    const file = target.files[0]
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(file)
    resetReader(target)
  }

  const resetReader = async (target) => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    target.value = ''
  }

  return (
    <StyledDiv>
      <StyledInput
        type='file'
        id='file'
        className='input-file'
        accept='.geojson'
        onChange={e => handleFileChosen(e.target)}>
      </StyledInput>
      <StyledInputLabel htmlFor="file">Upload Areas</StyledInputLabel>
    </StyledDiv>
  )
}

const mapDispatchToProps = {
  handleUploadFileChange,
}

const ConnectedGeoJsonUploader = connect(null, mapDispatchToProps)(GeoJsonUploader)

export default ConnectedGeoJsonUploader
