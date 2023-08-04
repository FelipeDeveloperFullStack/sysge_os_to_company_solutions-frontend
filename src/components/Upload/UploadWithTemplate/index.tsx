
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
  call?: () => Promise<void>
  closeModal?: () => void
}

type AcceptType = '.pdf' | 'video/*' | 'audio/*' | 'image/jpeg, image/png' | 'image/*'

export const UploadWithTemplate: React.FC<UploadWithTemplateProps> = ({ accept = '.pdf', endpoint, multiple = false, call, closeModal }) => {
  const [messageSuccess, setMessageSuccess] = useState('')
  const dispatch = useDispatch()

  const uploadInvoice = async (documentFiles) => {
    let formData = new FormData();
    for (const file of documentFiles) {
      formData.append('file[]', file);
    }
    await fetch(endpoint,
      {
        method: 'POST',
        body: formData
      },
    );
  };

  const invoiceUploadHandler = ({ files }) => {
    //const [file] = files;
    const fileList = Array.from(files) as File[]; // Forçando o tipo File[]

    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      uploadInvoice(fileList)
      // for (const file of files) {
      //   uploadInvoice([file]);
      // }
      //uploadInvoice(e.target.result);
    };
    //fileReader.readAsDataURL(file);
    fileList.forEach((file) => {
      fileReader.readAsDataURL(file);
    });
  };



  const updateRequests = () => {
    dispatch({
      type: LAYOUT_MAKE_REQUEST,
      payload: {
        makeRequest: Math.random(),
      },
    })
  }

  const onTemplateUpload = () => {
    call && call()
    setMessageSuccess('Arquivo(s) importado com sucesso.');
    updateRequests()
    closeModal && closeModal()
    toast.success('Arquivo(s) importado com sucesso')
  }

  return (
    <div className="card">
      {messageSuccess && <Alert>{messageSuccess}</Alert>}
      <FileUpload
        //customUpload={true}
        //uploadHandler={invoiceUploadHandler}
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
