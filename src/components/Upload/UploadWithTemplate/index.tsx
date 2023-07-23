
import React, { useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { toast } from 'src/components/Widgets/Toastify';
import { Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { LAYOUT_MAKE_REQUEST } from 'src/store/actions';

interface UploadWithTemplateProps {
  accept?: AcceptType
  endpoint: string
  multiple?: boolean
}

type AcceptType = '.pdf' | 'video/*' | 'audio/*' | 'image/jpeg, image/png' | 'image/*'

export const UploadWithTemplate: React.FC<UploadWithTemplateProps> = ({ accept = '.pdf', endpoint, multiple = false }) => {
  const [messageSuccess, setMessageSuccess] = useState('')
  const dispatch = useDispatch()

  const updateRequests = () => {
    dispatch({
      type: LAYOUT_MAKE_REQUEST,
      payload: {
        makeRequest: Math.random(),
      },
    })
  }

  const onTemplateUpload = () => {
    setMessageSuccess('Arquivo importado com sucesso.');
    updateRequests()
  }

  return (
    <div className="card">
      {messageSuccess && <Alert>{messageSuccess}</Alert>}
      <FileUpload
        onUpload={onTemplateUpload}
        name={multiple ? 'file[]' : 'file'}
        url={endpoint}
        multiple={multiple}
        accept={accept}
        maxFileSize={100000000000}
        uploadLabel='Enviar'
        cancelLabel='Cancelar'
        chooseLabel='Procurar'
        invalidFileSizeMessageSummary='Arquivo inválido.'
        invalidFileSizeMessageDetail='Tamanho máximo excedido.'
        emptyTemplate={<p className="m-0">Arraste e solte o arquivo para aqui para carregar.</p>} />
    </div>
  )
}
